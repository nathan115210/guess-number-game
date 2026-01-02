import { StyleSheet, Text } from "react-native";
import { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.titleContainer}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleContainer: {
    fontFamily: "Inter_900Black_Italic",
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    borderWidth: 2,
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    backgroundColor: "#DBEAFE",
  },
});

export default Title;
