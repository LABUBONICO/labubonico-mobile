import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Camera from "../screens/Camera";
import Details from "../screens/Details";
import Profile from "../screens/Profile";
import { MainStackParamList } from "../types/navigation";
import Categories from "../screens/Categories";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
