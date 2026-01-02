import { StyleSheet, View } from "react-native";

function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.cardContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    marginTop: 30,
    alignItems: "stretch",
    backgroundColor: "#16A34A",
    borderRadius: 38,
    // for android shadow
    elevation: 10,
    // for ios shadow - start
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.25,
    shadowRadius: 6,

    // for ios shadow - end
  },
});

export default Card;
