import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

/**
 * Layout raíz de la aplicación.
 * Incluye carga de fuentes, soporte para modo oscuro y navegación por Stack.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Carga de fuente personalizada
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Evita renderizar hasta que las fuentes estén cargadas
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1E90FF" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Productos" }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
