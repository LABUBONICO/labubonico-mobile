import styles from "../styles";
import * as firestore from "firebase/firestore";
import { JSONResponse } from "../types";
import { receipties } from "../api/firestore";
import { MainStackParamList } from "../types/navigation";
import { useContext, useEffect, useState, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import {
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import StackedBarChartScreen from "../components/Home/StackedBarChart";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { AuthContext } from "../contexts/AuthContext";
import ChatInput from "../components/ChatInput";
import { paperTheme } from "../theme/theme";
import { formatPrice } from "../utils";

const Home = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [balance, setBalance] = useState<number>(0);
  const [receiptsList, setReceiptsList] = useState<JSONResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { categories } = useContext(CategoriesContext);
  const { user, loadingUser } = useContext(AuthContext);

  const fetchReceipts = async () => {
    try {
      setIsLoading(true);
      const q = firestore.query(
        receipties,
        firestore.where("userId", "==", user?.uid)
      );
      const snapshot = await firestore.getDocs(q);
      const receipts = snapshot.docs.map((doc) => doc.data() as JSONResponse);
      setReceiptsList(receipts);
      console.log("Receipts fetched successfully:", receipts);
    } catch (error) {
      console.error("Error fetching receipts:", error);
      setReceiptsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loadingUser) {
      fetchReceipts();
    }
  }, [loadingUser, user?.uid]);

  const count = () => {
    receiptsList.forEach((element) => {
      if (element.price !== undefined && element.price !== null) {
        setBalance((prev) => prev + element.price);
      }
    });
  };
  useEffect(() => {
    setBalance(0);
    count();
  }, [receiptsList]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchReceipts();
    setRefreshing(false);
  }, [user?.uid]);

  const getCategorieColor = (name: string) => {
    const category = categories.find(
      (categorie) => categorie.name.toUpperCase() === name.toUpperCase()
    );
    return category ? category.color : "#000000";
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={{ alignItems: "center", gap: paperTheme.spacing.md }}>
            <Text
              variant="headlineLarge"
              style={{ paddingBottom: paperTheme.spacing.xl }}
            >
              R$ {formatPrice(balance)}
            </Text>
            <View style={{ height: 185, width: "100%" }}>
              <StackedBarChartScreen
                receipts={receiptsList}
                categories={categories}
              />
            </View>
            {receiptsList.length === 0 ? (
              <View style={styles.container}>
                <Text>Você não possui despesas cadastradas</Text>
              </View>
            ) : (
              <FlatList
                data={receiptsList}
                scrollEnabled={false}
                contentContainerStyle={{ flex: 1, gap: paperTheme.spacing.md }}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <View
                      style={{
                        backgroundColor: getCategorieColor(item.category),
                        height: 40,
                        width: 40,
                        borderRadius: paperTheme.borderRadius.sm,
                      }}
                    />
                    <Text variant="titleLarge" style={{ flex: 1 }}>
                      {item.category}
                    </Text>
                    <Text variant="titleMedium">
                      R$ {formatPrice(item.price)}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        )}
      </ScrollView>
      <ChatInput navigation={navigation} />
    </View>
  );
};

export default Home;
