import { useContext, useState } from "react";
import MainStack from "./MainStack";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../screens/Login";
import { ActivityIndicator, View } from "react-native";

const RootNavigation = () => {
  const { user, loadingUser } = useContext(AuthContext);
  if (loadingUser) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return user ? <MainStack /> : <Login />;
};

export default RootNavigation;
