import { useContext, useState } from "react";
import MainStack from "./MainStack";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../screens/Login";

const RootNavigation = () => {
  const { user } = useContext(AuthContext);
  return user ? <MainStack /> : <Login />;
};

export default RootNavigation;
