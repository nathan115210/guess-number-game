import { StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";

function NumberContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "#2563EB",
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "Inter_900Black_Italic",
    color: "#2563EB",
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default NumberContainer;
