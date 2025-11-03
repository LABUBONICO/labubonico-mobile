import styles from "../styles";
import * as firestore from "firebase/firestore";
import { JSONResponse } from "../types";
import { receipties } from "../api/firestore";
import { MainStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, FlatList, ActivityIndicator } from "react-native";

const Home = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [balance, setBalance] = useState<number>(0);
  const [receiptsList, setReceiptsList] = useState<JSONResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReceipts = async () => {
    try {
      setIsLoading(true);
      const snapshot = await firestore.getDocs(receipties);
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as JSONResponse[];
      console.log(docs);
      setReceiptsList(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchReceipts();
  }, []);

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
        <Text onPress={() => navigation.navigate("Camera")}>Go to Camera</Text>
        <Text onPress={() => navigation.navigate("Details")}>
          Go to Details
        </Text>
        <Text onPress={() => navigation.navigate("Profile")}>
          Go to Profile
        </Text>
      </View>
    </View>
  );
};

export default Home;
