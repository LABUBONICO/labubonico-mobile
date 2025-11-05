import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Camera from "../screens/Camera";
import Details from "../screens/Details";
import Profile from "../screens/Profile";
import { MainStackParamList } from "../types/navigation";
import Categories from "../screens/Categories";
import { navigationTheme, paperTheme } from "../theme/theme";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = ({
  chat,
  setChat,
}: {
  chat: boolean;
  setChat: (chat: boolean) => void;
}) => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: chat
              ? paperTheme.colors.primary
              : paperTheme.colors.background,
          },
          contentStyle: {
            backgroundColor: chat
              ? paperTheme.colors.primary
              : paperTheme.colors.background,
          },
        }}
        screenListeners={{
          state: (e) => {
            const state = e.data.state;
            if (state) {
              const currentRoute = state.routes[state.index];
              setChat(
                currentRoute.name === "Chat" || currentRoute.name === "Camera"
              );
            }
          },
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          options={{
            animation: "fade",
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
