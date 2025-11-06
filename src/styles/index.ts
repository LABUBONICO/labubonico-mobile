import { StyleSheet } from "react-native";
import { paperTheme } from "../theme/theme";

export const CATEGORY_COLORS = [
  "#1FC56F",
  "#1ABC9C",
  "#3498DB",
  "#FFD93D",
  "#FF9A00",
  "#E74C3C",
  "#FC5D8B",
  "#C75FFE",
  "#DBA39A",
  "#2C3E50",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: paperTheme.spacing.xl,
    gap: paperTheme.spacing.md,
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    fontFamily: "SwitzerRegular",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: paperTheme.spacing.xl,
    backgroundColor: paperTheme.colors.surface,
    borderRadius: paperTheme.borderRadius.md,
    gap: paperTheme.spacing.md,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: paperTheme.spacing.md,
    gap: paperTheme.spacing.md,
    width: "100%",
    backgroundColor: paperTheme.colors.surface,
    borderRadius: paperTheme.borderRadius.md,
  },

  containerRow: {
    gap: 10,
    paddingBlock: 10,
    paddingInline: 10,
    minWidth: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerText: {
    marginBottom: 20,
    alignItems: "center",
  },
  containerList: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    paddingInline: 6,
  },
  screen: {
    flex: 1,
  },

  buttonIcon: {
    borderWidth: 1,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold",
  },
  introText: {
    width: "60%",
    textAlign: "center",
    color: "#00000065",
  },
  messageUser: {
    margin: 10,
    textAlign: "justify",
    padding: 10,
    maxWidth: "75%",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "flex-end",
    borderColor: "#00000080",
    backgroundColor: "#fff",
  },
  messageAgent: {
    margin: 10,
    textAlign: "justify",
    padding: 10,
    maxWidth: "75%",
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
    borderColor: "#000000",
    backgroundColor: "#000000",
  },
  icon: {
    padding: 25,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
});

export default styles;
