import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import typography from "../styles/typography";
import colors from "../styles/colors";
import GNButton from "../components/ui/GNButton";
import ScreenBaseView from "../components/ui/ScreenBaseView";

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
  const { width, height } = useWindowDimensions();
  let imageSize = 300;

  if (width < 410) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView>
      <ScreenBaseView style={styles.container}>
        <LinearGradient
          colors={["#4ADE80", "#22D3EE"]}
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

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  gradientBorder: {
    borderRadius: 150,
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
