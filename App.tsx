import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { JSX, useEffect, useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as SplashScreen from "expo-splash-screen";
import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";

export default function App() {
  const [userNumber, setUserNumber] = useState<string | null>(null);
  const [gameIsOver, setGameIsOver] = useState<boolean>(false);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [loaded, error] = useFonts({ Inter_900Black });

  useEffect(() => {
    if (!loaded) SplashScreen.preventAutoHideAsync();
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  const gameOverHandler = (numberOfRounds: number) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  };

  const starterNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  const pickNumberHandler = (pickedNumber: string) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  let screen: JSX.Element = (
    <StartGameScreen onPickNumber={pickNumberHandler} />
  );
  if (userNumber && userNumber.length > 0) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartOver={starterNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar barStyle={"light-content"}></StatusBar>
      <LinearGradient
        colors={["#30a316", "#DFC517EF"]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaProvider>
            <SafeAreaView
              style={{ flex: 1 }}
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
