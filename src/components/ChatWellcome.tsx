import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { paperTheme } from "../theme/theme";
import { FontAwesome6 } from "@expo/vector-icons";

const ChatWellcome = ({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View style={styles.wellcomeContainer}>
      <Image
        source={require("../../assets/images/labubonico_logo.png")}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        Oi! Como posso te ajudar hoje?
      </Text>
      <View style={styles.wellcomeButtonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInput("Qual foi minha maior despesa este mês?")}
        >
          <Text
            variant="bodyMedium"
            style={{ color: paperTheme.colors.secondary }}
          >
            Qual foi minha maior despesa este mês?
          </Text>
          <FontAwesome6
            name="circle-chevron-right"
            size={24}
            color={paperTheme.colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInput("Compare meus gastos com o último mês.")}
        >
          <Text
            style={{ color: paperTheme.colors.secondary }}
            variant="bodyMedium"
          >
            Compare meus gastos com o último mês.
          </Text>
          <FontAwesome6
            name="circle-chevron-right"
            size={24}
            color={paperTheme.colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInput("Onde posso economizar?")}
        >
          <Text
            variant="bodyMedium"
            style={{ color: paperTheme.colors.secondary }}
          >
            Onde posso economizar?
          </Text>
          <FontAwesome6
            name="circle-chevron-right"
            size={24}
            color={paperTheme.colors.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wellcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: paperTheme.spacing.lg,
    gap: paperTheme.spacing.lg,
  },
  button: {
    padding: paperTheme.spacing.md,
    alignItems: "center",
    backgroundColor: paperTheme.colors.surface,
    borderRadius: paperTheme.borderRadius.full,
    justifyContent: "center",
    flexDirection: "row",
    gap: paperTheme.spacing.sm,
  },
  wellcomeButtonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: paperTheme.spacing.sm,
  },
});

export default ChatWellcome;
