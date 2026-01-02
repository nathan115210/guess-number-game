import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import GNButton from "../components/ui/GNButton";
import { useState } from "react";
import Title from "../components/ui/Title";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Card from "../components/ui/Card";

export default function StartGameScreen({
  onPickNumber,
}: {
  onPickNumber: (pickedNumber: string) => void;
}) {
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

    onPickNumber(enterNum);
  };

  const resetInputHandler = () => {
    setEnteredNum("");
  };
  return (
    <View style={styles.startGameContainer}>
      <Title>Guess Number</Title>
      <Card>
        <Text style={styles.intro}>Enter a Number</Text>
        <TextInput
          style={styles.input}
          keyboardType={"number-pad"}
          maxLength={2}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={enterNum}
          onChangeText={numberInputHandler}
        />
        <View style={styles.inputActionsContainer}>
          <View style={styles.buttonContainer}>
            <GNButton onPress={resetInputHandler} disabled={!enterNum}>
              Reset
            </GNButton>
          </View>
          <View style={styles.buttonContainer}>
            <GNButton onPress={confirmInputHandler} disabled={!enterNum}>
              Confirm
            </GNButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  startGameContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    //alignItems: "center",
  },
  intro: {
    fontFamily: "Inter_900Black",
    color: colors.surface.color,
    fontSize: typography.heading2.fontSize,
    textAlign: "center",
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
    alignSelf: "center",
    marginBottom: 32,
  },
  inputActionsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
