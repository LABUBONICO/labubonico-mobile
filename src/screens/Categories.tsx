import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../styles";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SheetManager } from "react-native-actions-sheet";
import { paperTheme } from "../theme/theme";

const Categories = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        style={{ width: "100%" }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
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
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </TouchableOpacity>
        )}
      />
      <Button
        {...paperTheme.buttons.contained}
        onPress={() => SheetManager.show("CategorieSheet")}
      >
        <FontAwesome5 name="plus" size={18} /> Adicionar Categoria
      </Button>
    </View>
  );
};

export default Categories;
