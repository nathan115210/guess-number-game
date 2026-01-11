import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo } from "react";
import typography from "../styles/typography";
import colors from "../styles/colors";
import GNButton from "../components/ui/GNButton";
import ScreenBaseView from "../components/ui/ScreenBaseView";

type GameOverScreenProps = {
  roundsNumber: number;
  userNumber: string;
  onStartOver: () => void;
};

const IMAGE_SIZE_DEFAULT = 300;
const IMAGE_SIZE_SMALL_WIDTH = 150;
const IMAGE_SIZE_SMALL_HEIGHT = 80;

const BORDER_GRADIENT_COLORS = ["#4ADE80", "#22D3EE"] as const;

function GameOverScreen({
  roundsNumber,
  userNumber,
  onStartOver,
}: GameOverScreenProps) {
  const { width, height } = useWindowDimensions();

  const handleStartOver = useCallback(() => {
    onStartOver();
  }, [onStartOver]);

  const imageSize = useMemo(() => {
    if (height < 400) return IMAGE_SIZE_SMALL_HEIGHT;
    if (width < 410) return IMAGE_SIZE_SMALL_WIDTH;
    return IMAGE_SIZE_DEFAULT;
  }, [height, width]);

  const imageStyle = useMemo(
    () => ({
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2,
    }),
    [imageSize],
  );

  return (
    <ScrollView>
      <ScreenBaseView style={styles.container}>
        <LinearGradient
          colors={BORDER_GRADIENT_COLORS}
          style={styles.gradientBorder}
        >
          <View style={[styles.imageContainer, imageStyle]}>
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
      </ScreenBaseView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  gradientBorder: {
    borderRadius: IMAGE_SIZE_DEFAULT / 2,
    padding: 4,
  },
  imageContainer: {
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
