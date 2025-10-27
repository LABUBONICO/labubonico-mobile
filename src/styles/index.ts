import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  containerRow: {
    gap: 10,
    paddingBlock: 10,
    paddingInline: 10,
    minWidth: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
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
    paddingBottom: 80,
  },
  screen: {
    flex: 1,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 25,
    minWidth: "70%",
    borderColor: "#000",
  },
  buttonIcon: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold",
  },
  introText: {
    width: "60%",
    textAlign: "center",
    color: "#00000065"
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
    backgroundColor: "#fff"
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
  }
});

export default styles;