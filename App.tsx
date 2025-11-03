import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigation from "./src/navigation/RootNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SheetProvider } from "react-native-actions-sheet";
import { CategoriesProvider } from "./src/contexts/CategoriesContext";
import "./src/sheets/sheets";

export default function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SheetProvider context="global">
              <RootNavigation />
              <StatusBar style="auto" />
            </SheetProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </CategoriesProvider>
    </AuthProvider>
  );
}
