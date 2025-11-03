import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SheetManager } from "react-native-actions-sheet";

const Categories = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        style={{ width: "100%", height: "80%", gap: 10 }}
        contentContainerStyle={{ height: "80%", paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              SheetManager.show("CategorieSheet", {
                payload: {
                  index: index,
                },
              })
            }
          >
            <View
              style={{
                backgroundColor: item.color,
                height: 25,
                width: 25,
                borderRadius: 100,
              }}
            />
            <Text style={styles.buttonText}>{item.name}</Text>
            <Ionicons name="arrow-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.button, { justifyContent: "center" }]}
        onPress={() => SheetManager.show("CategorieSheet")}
      >
        <Text>+ Adicionar Categoria</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;
