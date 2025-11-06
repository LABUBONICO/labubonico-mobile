import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SheetProvider } from "react-native-actions-sheet";
import { CategoriesProvider } from "./src/contexts/CategoriesContext";
import { useFonts } from "expo-font";
import "./src/sheets/sheets";
import { PaperProvider } from "react-native-paper";
import { paperTheme } from "./src/theme/theme";

export default function App() {
  useFonts({
    SwitzerBold: require("./assets/fonts/SwitzerBold.otf"),
    SwitzerSemibold: require("./assets/fonts/SwitzerSemibold.otf"),
    SwitzerRegular: require("./assets/fonts/SwitzerRegular.otf"),
    PPEditorialNew: require("./assets/fonts/PPEditorialNew.otf"),
  });

  return (
    <AuthProvider>
      <CategoriesProvider>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SheetProvider context="global">
                <RootNavigation />
                <StatusBar style="auto" />
              </SheetProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </PaperProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}
