import {Pressable, type StyleProp, StyleSheet, Text, View, type ViewStyle} from "react-native";
import colors from "../styles/colors";
import {ReactNode} from "react";

export interface GNButtonProps {
    children?: ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

function GNButton({children, onPress, style}: GNButtonProps) {
    return (
        <View style={[styles.buttonContainer, style]}>
            <Pressable style={({pressed}) => pressed ? [styles.buttonInner, styles.pressed] : styles.buttonInner}
                       onPress={onPress}
                       android_ripple={{color: colors.surface.backgroundColor, foreground: true}}>
                <Text style={styles.buttonText}>{children}</Text>

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
        // for android shadow
        elevation: 2,
    },
    buttonText: {
        color: colors.primary.color,
        textAlign: "center",
    },
    pressed: {
        opacity: 0.75,
        
    }
})