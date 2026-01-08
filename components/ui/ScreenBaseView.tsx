import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode, useEffect, useState } from "react";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { useKeyboardHeight } from "../../hooks/useKeyboardHeight";

function ScreenBaseView({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle> | undefined;
}) {
  const insets = useSafeAreaInsets();

  const deviceHeight = useWindowDimensions().height;

  const keyboardHeight = useKeyboardHeight();

  const defaultMarginTop = 30;
  const [viewMarginTop, setViewMarginTop] = useState<number>(defaultMarginTop);

  useEffect(() => {
    if (deviceHeight < 410 && keyboardHeight > 0) {
      setViewMarginTop(-(keyboardHeight / 2) + (insets.top || 0) + 10);
    } else {
      setViewMarginTop(defaultMarginTop);
    }
  }, [keyboardHeight, deviceHeight]);

  return (
    <View
      style={[
        styles.ScreenContainer,
        { paddingBottom: (insets.bottom || 0) + 16 },
        //{marginTop: viewMarginTop},
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    paddingHorizontal: 16,
    marginTop: 30,
    flex: 1,
  },
});

export default ScreenBaseView;
