// GameOverScreen.tsx
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../components/ui/Title";
import typography from "../styles/typography";
import colors from "../styles/colors";
import GNButton from "../components/ui/GNButton";

function GameOverScreen({
  roundsNumber,
  userNumber,
  onStartOver,
}: {
  roundsNumber: number;
  userNumber: string;
  onStartOver: () => void;
}) {
  const handleStartOver = () => onStartOver();

  return (
    <View style={styles.container}>
      <Title>
        <Text>Game over</Text>
      </Title>
      <LinearGradient
        colors={["#4ADE80", "#22D3EE"]}
        style={styles.gradientBorder}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.jpg")}
          />
        </View>
      </LinearGradient>
      <Text style={styles.summary}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>
      </Text>
      <GNButton onPress={handleStartOver}>Start over</GNButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  gradientBorder: {
    borderRadius: 150,
    padding: 4,
  },
  imageContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summary: {
    fontSize: typography.heading2.fontSize,
    textAlign: "center",
    fontFamily: "Inter_900Black",
    color: colors.primary.color,
    backgroundColor: colors.primary.backgroundColor,
    padding: 20,
    borderRadius: 12,
  },
  highlight: {
    color: colors.accent.color,
  },
});

export default GameOverScreen;
