import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Config from "../screens/Config";
import Camera from "../screens/Camera";
import Graphics from "../screens/Graphics";

const Tab = createBottomTabNavigator();

const MainBottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Graphics" component={Graphics} />
                <Tab.Screen name="Camera" component={Camera} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="Config" component={Config} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainBottomTabs;