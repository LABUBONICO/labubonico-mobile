import { useState } from "react"
import Login from "../screens/Login";
import MainBottomTabs from "./MainBottomTabs";

const RootNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    return (
        <>
            {isAuthenticated ? <MainBottomTabs /> : <Login />}
        </>
    )
}

export default RootNavigation;