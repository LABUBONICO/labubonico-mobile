import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
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
import { paperTheme } from "../../theme/theme";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CategorieSheet = () => {
  const payload = useSheetPayload("CategorieSheet");
  const ref = useSheetRef("CategorieSheet");
  const insets = useSafeAreaInsets();

  const { categories, updateCategories, loading } =
    useContext(CategoriesContext);

  const [color, setColor] = useState(
    payload ? categories[payload?.index || 0].color : "#1FC56F"
  );
  const [name, setName] = useState(
    payload ? categories[payload?.index || 0].name : ""
  );
  const [emptyNameError, setEmptyNameError] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      setEmptyNameError(true);
      return;
    } else if (!payload) {
      await updateCategories([...categories, { color, name }]);
      ref.current.hide();
    } else {
      const updatedCategories = [...categories];
      updatedCategories[payload.index] = { color, name };
      await updateCategories(updatedCategories);
      ref.current.hide();
    }
  };

  const handleDelete = () => {
    if (payload) {
      const updatedCategories = [...categories];
      updatedCategories.splice(payload.index, 1);
      updateCategories(updatedCategories);
      ref.current.hide();
    } else {
      ref.current.hide();
    }
  };

  return (
    <ActionSheet
      containerStyle={{
        ...sheetStyles.container,
        paddingBottom: insets.bottom + paperTheme.spacing.xl,
      }}
    >
      <View style={{ gap: paperTheme.spacing.xl, alignItems: "center" }}>
        <FlatList
          data={CATEGORY_COLORS}
          horizontal
          style={sheetStyles.colorList}
          contentContainerStyle={sheetStyles.colorListContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setColor(item)}
              style={[
                {
                  height: 25,
                  width: 25,
                  borderRadius: 100,
                  backgroundColor: item,
                  borderWidth: 3,
                  borderColor: color === item ? "#000" : "transparent",
                },
              ]}
            />
          )}
        />
        <TextInput
          style={[
            styles.input,
            sheetStyles.categoryInput,
            { borderColor: emptyNameError ? "red" : "transparent" },
          ]}
          placeholder="Nome da categoria"
          value={name}
          onChangeText={setName}
        />
        <View style={sheetStyles.buttonContainer}>
          <Button
            {...paperTheme.buttons.contained}
            buttonColor={paperTheme.colors.surface}
            style={{ flex: 1 }}
            onPress={handleDelete}
            loading={loading}
          >
            Excluir
          </Button>
          <Button
            {...paperTheme.buttons.contained}
            buttonColor={paperTheme.colors.success}
            style={{ flex: 1 }}
            onPress={handleSave}
            loading={loading}
          >
            Salvar
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
};

const sheetStyles = StyleSheet.create({
  container: {
    padding: paperTheme.spacing.xl,
    height: "auto",
  },
  colorList: {
    maxHeight: 25,
    marginTop: paperTheme.spacing.sm,
  },
  colorListContent: {
    gap: paperTheme.spacing.md,
    justifyContent: "space-between",
  },
  categoryInput: {
    borderWidth: 1,
    padding: paperTheme.spacing.xl,
    backgroundColor: paperTheme.colors.surface,
    borderRadius: paperTheme.borderRadius.md,
    height: 70,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

export default CategorieSheet;
