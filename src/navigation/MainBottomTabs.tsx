import styles from "../styles";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Config from "../screens/Config";
import Camera from "../screens/Camera";
import Graphics from "../screens/Graphics";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const MainBottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#f1f1f1",
                    tabBarInactiveTintColor: "#000000",
                    tabBarIconStyle: {},
                    tabBarStyle: {
                        padding: 30,
                        height: 100,
                        borderTopWidth: 0,
                        backgroundColor: "#f1f1f1",
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, focused, size }) =>
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: focused ? "#000" : "",
                            }}>
                                <Ionicons
                                    name="home"
                                    size={focused ? size * 1.3 : size}
                                    style={styles.icon}
                                    color={color}
                                />
                            </View>
                    }}
                />
                <Tab.Screen
                    name="Graphics"
                    component={Graphics}
                    options={{
                        tabBarIcon: ({ color, focused, size }) =>
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: focused ? "#000" : "",
                            }}>
                                <Ionicons
                                    name="trending-up"
                                    size={focused ? size * 1.3 : size}
                                    style={styles.icon}
                                    color={color}
                                />
                            </View>
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={Camera}
                    options={{
                        tabBarIcon: ({ color, focused, size }) =>
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: focused ? "#000" : "",
                            }}>
                                <Ionicons
                                    name="camera"
                                    size={focused ? size * 1.3 : size}
                                    style={styles.icon}
                                    color={color}
                                />
                            </View>
                    }}
                />
                <Tab.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        tabBarIcon: ({ color, focused, size }) =>
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: focused ? "#000" : "",
                            }}>
                                <Ionicons
                                    name="chatbubble"
                                    size={focused ? size * 1.3 : size}
                                    style={styles.icon}
                                    color={color}
                                />
                            </View>
                    }}
                />
                <Tab.Screen
                    name="Config"
                    component={Config}
                    options={{
                        tabBarIcon: ({ color, focused, size }) =>
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: focused ? "#000" : "",
                            }}>
                                <Ionicons
                                    name="settings"
                                    size={focused ? size * 1.3 : size}
                                    style={styles.icon}
                                    color={color}
                                />
                            </View>
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainBottomTabs;