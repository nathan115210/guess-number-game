import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import GNButton from "../components/ui/GNButton";
import Title from "../components/ui/Title";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../styles/colors";
import ScreenBaseView from "../components/ui/ScreenBaseView";

type GameScreenProps = {
  userNumber: string;
  onGameOver: (roundsNum: number) => void;
};

const MIN_BOUNDARY = 1;
const MAX_BOUNDARY = 100;

const guessNumberColorStyle = { color: colors.accent.color };

function GameScreen({ userNumber, onGameOver }: GameScreenProps) {
  const userGuess = Number.parseInt(userNumber, 10);

  // Boundaries must persist across renders without triggering re-renders.
  const minBoundary = useRef(MIN_BOUNDARY);
  const maxBoundary = useRef(MAX_BOUNDARY);

  // Compute initial guess exactly once per game screen mount.
  const [currentGuess, setCurrentGuess] = useState<number>(() =>
    generateRandomBetween(minBoundary.current, maxBoundary.current, userGuess),
  );

  const [guessRounds, setGuessRounds] = useState<number[]>(() => [
    currentGuess,
  ]);

  // Reset boundaries when component mounts - game restart
  useEffect(() => {
    minBoundary.current = MIN_BOUNDARY;
    maxBoundary.current = MAX_BOUNDARY;
  }, []);

  useEffect(() => {
    if (currentGuess === userGuess) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userGuess, onGameOver, guessRounds.length]);

  const nextGuessHandler = useCallback(
    (direction: "lower" | "higher") => {
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

      const nextNumber = generateRandomBetween(
        minBoundary.current,
        maxBoundary.current,
        userGuess,
      );

      setCurrentGuess(nextNumber);
      setGuessRounds((prevRounds) => [nextNumber, ...prevRounds]);
    },
    [currentGuess, userGuess],
  );

  const onPressHigher = useCallback(() => {
    nextGuessHandler("higher");
  }, [nextGuessHandler]);

  const onPressLower = useCallback(() => {
    nextGuessHandler("lower");
  }, [nextGuessHandler]);

  const { width: deviceWidth } = useWindowDimensions();
  const isLandscape = deviceWidth > 500;

  const buttonStyle = useMemo(
    () => [styles.button, !isLandscape && styles.buttonPortraitFlex],
    [isLandscape],
  );

  const renderGuessItem = useCallback(
    ({ item, index }: ListRenderItemInfo<number>) => {
      // Because guessRounds is stored newest-first, index 0 is the latest guess.
      const roundNumber = guessRounds.length - index;

      return (
        <View style={styles.guessListItemContainer}>
          <Text style={[styles.text, guessNumberColorStyle]}>
            #{roundNumber}
          </Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      );
    },
    [guessRounds.length],
  );

  return (
    <ScreenBaseView>
      <Title>Opponent's Guess</Title>
      <Card>
        {!isLandscape && <NumberContainer>{currentGuess}</NumberContainer>}
        <View style={styles.actionsContainer}>
          <GNButton style={buttonStyle} onPress={onPressHigher}>
            <Ionicons name="add" size={24} color="green" />
          </GNButton>

          {isLandscape && <NumberContainer>{currentGuess}</NumberContainer>}

          <GNButton style={buttonStyle} onPress={onPressLower}>
            <Ionicons name="remove" size={24} color="green" />
          </GNButton>
        </View>
      </Card>

      <View style={styles.guessList}>
        <FlatList
          data={guessRounds}
          renderItem={renderGuessItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.guessListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenBaseView>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {},
  buttonPortraitFlex: { flex: 1 },

  guessList: {
    flex: 1,
    paddingVertical: Dimensions.get("window").width < 380 ? 10 : 18,
    borderRadius: 8,
    maxHeight: Dimensions.get("window").width < 380 ? 350 : 400,
  },

  guessListItemContainer: {
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
    color: "#111827",
  },
});

export default GameScreen;

const keyExtractor = (item: number) => item.toString();

// Helpers
function generateRandomBetween(
  min: number,
  max: number,
  exclude: number,
): number {
  // Range is [min, max) to match Math.random scaling.
  // When the range collapses, return min as a safe fallback.
  if (max - min <= 1) return min;

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
}
