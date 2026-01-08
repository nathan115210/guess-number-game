import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import GNButton from "../components/ui/GNButton";
import Title from "../components/ui/Title";
import { useEffect, useMemo, useRef, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";
import ScreenBaseView from "../components/ui/ScreenBaseView";

function GameScreen({
  userNumber,
  onGameOver,
}: {
  userNumber: string;
  onGameOver: (roundsNum: number) => void;
}) {
  const userGuess: number = parseInt(userNumber);
  let minBoundary = useRef(1);
  let maxBoundary = useRef(100);

  const initialGuess = useMemo(
    () =>
      generateRandomBetween(
        minBoundary.current,
        maxBoundary.current,
        userGuess,
      ),
    [userGuess, minBoundary.current, maxBoundary.current],
  );

  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  const [guessRounds, setGuessRounds] = useState<Array<number>>([initialGuess]);

  useEffect(() => {
    if (currentGuess === userGuess) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userGuess, onGameOver]);

  // Reset boundaries when component mounts - game restart
  useEffect(() => {
    minBoundary.current = 1;
    maxBoundary.current = 100;
  }, []);

  const nextGuessHandler = (direction: "lower" | "higher") => {
    if (
      (direction === "lower" && currentGuess < userGuess) ||
      (direction === "higher" && currentGuess > userGuess)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary.current = currentGuess;
    } else {
      minBoundary.current = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      userGuess,
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevRounds) => [newRndNumber, ...prevRounds]);
  };
  const { width: deviceWidth } = useWindowDimensions();

  const isLandscape = deviceWidth > 500;

  return (
    <ScreenBaseView>
      <Title>Opponent's Guess</Title>
      <Card>
        {!isLandscape && <NumberContainer>{currentGuess}</NumberContainer>}
        <View>
          <View style={styles.actionsContainer}>
            <GNButton
              style={{ flex: isLandscape ? undefined : 1 }}
              onPress={() => nextGuessHandler("higher")}
            >
              {" "}
              <Ionicons name="add" size={24} color="green" />
            </GNButton>
            {isLandscape && <NumberContainer>{currentGuess}</NumberContainer>}
            <GNButton
              style={{ flex: isLandscape ? undefined : 1 }}
              onPress={() => nextGuessHandler("lower")}
            >
              <Ionicons name="remove" size={24} color="green" />
            </GNButton>
          </View>
        </View>
      </Card>
      <View style={styles.guessList}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <View style={styles.guessListItemContainer}>
              <Text style={{ color: colors.accent.color, ...styles.text }}>
                #{guessRounds.length - itemData.index}
              </Text>
              <Text style={styles.text}>{itemData.item}</Text>
            </View>
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </ScreenBaseView>
  );
}

const styles = StyleSheet.create({
  gameScreenContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  guessList: {
    paddingVertical: Dimensions.get("window").width < 380 ? 10 : 18,
    borderRadius: 8,
    maxHeight: Dimensions.get("window").width < 380 ? 350 : 400,
  },
  guessListItemContainer: {
    fontFamily: "Inter_900Black",
    color: "#111827",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Inter_900Black",
    fontSize: 18,
  },
});

export default GameScreen;

// Helpers
function generateRandomBetween(
  min: number,
  max: number,
  exclude: number,
): number {
  if (max - min <= 1) return min; // fallback when range collapses
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}

function getGuessItemIndex(guessRounds: number[], item: number) {
  const index = guessRounds.findIndex((g) => g === item);
  return index + 1;
}
