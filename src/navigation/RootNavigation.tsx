import { useContext, useState } from "react";
import MainStack from "./MainStack";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../screens/Login";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { paperTheme } from "../theme/theme";

const RootNavigation = () => {
  const { user, loadingUser } = useContext(AuthContext);
  const [chat, setChat] = useState<boolean>(false);

  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: chat
          ? paperTheme.colors.primary
          : paperTheme.colors.background,
      }}
      edges={["top", "bottom"]}
    >
      {user ? <MainStack chat={chat} setChat={setChat} /> : <Login />}
    </SafeAreaView>
  );
};

export default RootNavigation;
