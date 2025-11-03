import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {
  useSheetPayload,
  useSheetRef,
} from "react-native-actions-sheet";
import styles, { CATEGORY_COLORS } from "../../styles";
import { useContext, useState } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";

const CategorieSheet = () => {
  const payload = useSheetPayload("CategorieSheet");
  const ref = useSheetRef("CategorieSheet");

  const { categories, updateCategories, loading } =
    useContext(CategoriesContext);

  const [color, setColor] = useState(
    payload ? categories[payload?.index || 0].color : "#1FC56F"
  );
  const [name, setName] = useState(
    payload ? categories[payload?.index || 0].name : ""
  );

  const handleSave = async () => {
    try {
      if (!payload) {
        await updateCategories([...categories, { color, name }]);
      } else {
        const updatedCategories = [...categories];
        updatedCategories[payload.index] = { color, name };
        await updateCategories(updatedCategories);
      }
    } catch (error) {
    } finally {
      ref.current.hide();
    }
  };

  const handleDelete = () => {
    try {
      if (payload) {
        const updatedCategories = [...categories];
        updatedCategories.splice(payload.index, 1);
        updateCategories(updatedCategories);
      }
    } finally {
      ref.current.hide();
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        padding: 32,
        height: 250,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ gap: 20, flex: 1, justifyContent: "space-between" }}>
        <FlatList
          data={CATEGORY_COLORS}
          horizontal
          style={{ maxHeight: 25, width: "100%" }}
          contentContainerStyle={{ gap: 10, justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setColor(item)}
              style={{
                backgroundColor: item,
                height: 25,
                width: 25,
                borderRadius: 100,
                borderWidth: color === item ? 3 : 0,
                borderColor: "#000",
              }}
            />
          )}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome da categoria"
          value={name}
          onChangeText={setName}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={handleDelete}>
            <Text>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            {loading ? <ActivityIndicator size="small" /> : <Text>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
};

export default CategorieSheet;
