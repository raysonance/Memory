import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { default as mapping } from "./mapping.json";
import RootNavigation from "./navigation";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Action_Man: require("./src/assets/font/Action_Man.ttf"),
    Action_Man_Bold: require("./src/assets/font/Action_Man_Bold.ttf"),
    Pacifico: require("./src/assets/font/Pacifico.ttf"),
  });

  console.log(fontsLoaded);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark} customMapping={mapping}>
        <RootNavigation />
        <View onLayout={onLayoutRootView}></View>
      </ApplicationProvider>
    </>
  );
}
