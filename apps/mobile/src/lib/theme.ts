import { color, fontFamily, fontSize, radius, spacing } from "@jaza/shared";

/** Re-exported as-is from @jaza/shared — single source of truth for both apps. */
export { color, fontFamily, fontSize, radius, spacing };

/** Font family names as registered with expo-font in app/_layout.tsx. */
export const fonts = {
  displayRegular: "Fraunces_400Regular",
  displayItalic: "Fraunces_400Regular_Italic",
  displayMedium: "Fraunces_500Medium",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  mono: "IBMPlexMono_400Regular",
  monoMedium: "IBMPlexMono_500Medium",
} as const;

/** Pass to useFonts() in app/_layout.tsx. */
export { Fraunces_400Regular, Fraunces_400Regular_Italic, Fraunces_500Medium } from "@expo-google-fonts/fraunces";
export { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
export { IBMPlexMono_400Regular, IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
