import styles from "../styles";
import * as firestore from "firebase/firestore";
import { JSONResponse } from "../types";
import { receipties } from "../api/firestore";
import { MainStackParamList } from "../types/navigation";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import StackedBarChartScreen from "../components/Home/StackedBarChart";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { AuthContext } from "../contexts/AuthContext";

const Home = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [balance, setBalance] = useState<number>(0);
  const [receiptsList, setReceiptsList] = useState<JSONResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      setBalance((prev) => prev + element.price);
    });
  };
  useEffect(() => {
    setBalance(0);
    count();
  }, [receiptsList]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={{ ...styles.container }}>
          <View
            style={{
              alignSelf: "flex-start",
              marginTop: 40,
              borderBottomWidth: 2,
              borderBottomColor: "black",
              width: "90%",
              marginInline: 20,
            }}
          >
            <Text>Suas despesas do mês</Text>
            <Text style={{ fontSize: 48, fontWeight: "bold" }}>
              R$ {balance.toFixed(2)}
            </Text>
          </View>
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
              contentContainerStyle={{ flex: 1 }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBlock: 10,
                    padding: 10,
                    minWidth: "90%",
                  }}
                >
                  <Text>{item.category}</Text>
                  <Text>R$ {item.price.toFixed(2)}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}

      <View style={styles.containerRow}>
        <Text onPress={() => navigation.navigate("Chat")}>Go to Chat</Text>
        <Text onPress={() => navigation.navigate("Profile")}>
          Go to Profile
        </Text>
      </View>
    </View>
  );
};

export default Home;
