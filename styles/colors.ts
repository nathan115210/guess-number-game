import { StyleSheet } from "react-native";

const colors = StyleSheet.create({
  primary: {
    color: "#2563EB", // Blue 600 – main brand/action color
    backgroundColor: "#DBEAFE", // Blue 100 – subtle primary background
  },

  secondary: {
    color: "#16A34A", // Green 600 – secondary / success
    backgroundColor: "#DCFCE7", // Green 100
  },

  muted: {
    color: "#6B7280", // Gray 500 – muted text
    backgroundColor: "#F3F4F6", // Gray 100
  },

  accent: {
    color: "#EA580C", // Orange 600 – highlights / CTA accents
    backgroundColor: "#FFEDD5", // Orange 100
  },

  background: {
    backgroundColor: "#FFFFFF", // App background
    color: "#111827", // Default text (Gray 900)
  },

  surface: {
    backgroundColor: "#F9FAFB", // Cards / sheets
    color: "#1F2937", // Surface text (Gray 800)
  },
});

export default colors;
