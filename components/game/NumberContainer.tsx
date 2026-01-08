import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";

function NumberContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "#2563EB",
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignSelf: "center", // prevent stretching the container and keep it centered
  },
  numberText: {
    fontFamily: "Inter_900Black_Italic",
    color: "#2563EB",
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontWeight: "bold",
  },
});

export default NumberContainer;
