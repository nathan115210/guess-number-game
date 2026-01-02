import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import colors from "../../styles/colors";
import { ReactNode } from "react";

export interface GNButtonProps {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

function GNButton({
  children,
  onPress,
  style,
  disabled = false,
}: GNButtonProps) {
  return (
    <View
      style={[
        styles.buttonContainer,
        style,
        disabled && styles.disabledContainer,
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.buttonInner,
          pressed && !disabled && styles.pressed,
          disabled && styles.disabledInner,
        ]}
        onPress={onPress}
        android_ripple={{
          color: colors.surface.backgroundColor,
          foreground: true,
        }}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.disabledText]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

export default GNButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInner: {
    backgroundColor: colors.primary.backgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    fontFamily: "Inter_900Black",
    color: colors.primary.color,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  disabledInner: {
    elevation: 0,
  },
  disabledText: {
    color: colors.surface.color,
  },
});
