import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState<string | null>(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [loaded, error] = useFonts({ Inter_900Black });

  useEffect(() => {
    // Keep splash visible until fonts are loaded (or an error occurs).
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const gameOverHandler = useCallback((numberOfRounds: number) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }, []);

  const startNewGameHandler = useCallback(() => {
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(false);
  }, []);

  const pickNumberHandler = useCallback((pickedNumber: string) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }, []);

  const screen: JSX.Element | null = useMemo(() => {
    if (!loaded && !error) return null;

    if (gameIsOver && userNumber) {
      return (
        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onStartOver={startNewGameHandler}
        />
      );
    }

    if (userNumber) {
      return (
        <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
      );
    }

    return <StartGameScreen onPickNumber={pickNumberHandler} />;
  }, [
    loaded,
    error,
    gameIsOver,
    userNumber,
    guessRounds,
    startNewGameHandler,
    gameOverHandler,
    pickNumberHandler,
  ]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#30a316", "#DFC517EF"]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaProvider>
            <SafeAreaView
              style={styles.rootScreen}
              edges={["top", "bottom", "left", "right"]}
            >
              {screen}
            </SafeAreaView>
          </SafeAreaProvider>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
  backgroundImage: { opacity: 0.35 },
});
