import { useState } from "react";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const RootNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  return <>{isAuthenticated ? <MainStack /> : <AuthStack />}</>;
};

export default RootNavigation;
