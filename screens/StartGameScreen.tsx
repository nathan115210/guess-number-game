import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GNButton from "../components/ui/GNButton";
import { useCallback, useMemo, useState } from "react";
import Title from "../components/ui/Title";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Card from "../components/ui/Card";
import ScreenBaseView from "../components/ui/ScreenBaseView";

type StartGameScreenProps = {
  onPickNumber: (pickedNumber: string) => void;
};

const MIN_NUMBER = 1;
const MAX_NUMBER = 99;

export default function StartGameScreen({
  onPickNumber,
}: StartGameScreenProps) {
  const [enteredNum, setEnteredNum] = useState<string>("");

  const sanitizedInput = useMemo(
    () => enteredNum.replace(/[^\d]/g, ""),
    [enteredNum],
  );
  const isInputEmpty = sanitizedInput.length === 0;

  const resetInputHandler = useCallback(() => {
    setEnteredNum("");
  }, []);

  const numberInputHandler = useCallback((value: string) => {
    // On some keyboards/paste events, non-digits can slip in; sanitize aggressively.
    setEnteredNum(value.replace(/[^\d]/g, ""));
  }, []);

  const confirmInputHandler = useCallback(() => {
    const chosenNumber = Number(sanitizedInput);

    const isValid =
      Number.isInteger(chosenNumber) &&
      chosenNumber >= MIN_NUMBER &&
      chosenNumber <= MAX_NUMBER;

    if (!isValid) {
      Alert.alert(
        "Invalid Number",
        `Number has to be a number between ${MIN_NUMBER} and ${MAX_NUMBER}`,
        [{ text: "OK", onPress: resetInputHandler, style: "destructive" }],
      );
      return;
    }

    onPickNumber(sanitizedInput);
  }, [onPickNumber, resetInputHandler, sanitizedInput]);

  return (
    <ScrollView style={styles.root}>
      <KeyboardAvoidingView style={styles.root} behavior="position">
        <ScreenBaseView>
          <Title>Guess Number</Title>
          <Card>
            <Text style={styles.intro}>Enter a Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              autoCapitalize="none"
              autoCorrect={false}
              value={enteredNum}
              onChangeText={numberInputHandler}
            />
            <View style={styles.inputActionsContainer}>
              <View style={styles.buttonContainer}>
                <GNButton onPress={resetInputHandler} disabled={isInputEmpty}>
                  Reset
                </GNButton>
              </View>
              <View style={styles.buttonContainer}>
                <GNButton onPress={confirmInputHandler} disabled={isInputEmpty}>
                  Confirm
                </GNButton>
              </View>
            </View>
          </Card>
        </ScreenBaseView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

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
