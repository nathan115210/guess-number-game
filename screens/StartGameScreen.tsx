import { Alert, StyleSheet, TextInput, View } from "react-native";
import GNButton from "../components/GNButton";
import colors from "../styles/colors";
import { useState } from "react";

export default function StartGameScreen() {
  const [enterNum, setEnteredNum] = useState<string>("");
  const numberInputHandler = (value: string) => {
    setEnteredNum(value);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enterNum);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99",
        [{ text: "OK", onPress: resetInputHandler, style: "destructive" }],
      );
      return;
    }
  };

  const resetInputHandler = () => {
    setEnteredNum("");
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={""}
        placeholderTextColor={colors.surface.color}
        keyboardType={"number-pad"}
        maxLength={2}
        autoCapitalize={"none"}
        autoCorrect={false}
        value={enterNum}
        onChangeText={numberInputHandler}
      />
      <View style={styles.inputActionsContainer}>
        <View style={styles.buttonContainer}>
          <GNButton onPress={resetInputHandler}>Reset</GNButton>
        </View>
        <View style={styles.buttonContainer}>
          <GNButton onPress={confirmInputHandler} disabled={!enterNum}>
            Confirm
          </GNButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#16A34A",
    borderRadius: 8,
    // for android shadow
    elevation: 10,
    // for ios shadow - start
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.25,
    shadowRadius: 6,
    // for ios shadow - end
  },
  input: {
    height: 70,
    width: 70,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputActionsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
