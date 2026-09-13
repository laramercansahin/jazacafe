import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Svg, { Circle } from "react-native-svg";
import { ScreenContainer } from "../src/components/ScreenContainer";
import { Button } from "../src/components/Button";
import { color, fonts, spacing } from "../src/lib/theme";

export default function Welcome() {
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.hero}>
        <Vinyl />
        <Text style={styles.logo}>Jaza</Text>
        <Text style={styles.tagline}>Culture · Music · Cafe</Text>
      </View>

      <View style={styles.footer}>
        <Link href="/(auth)/register/account" asChild>
          <Button label="Üye ol" onPress={() => {}} />
        </Link>
      </View>
    </ScreenContainer>
  );
}

function Vinyl() {
  return (
    <Svg width={96} height={96} viewBox="0 0 100 100" style={{ marginBottom: spacing.xl }}>
      <Circle cx={50} cy={50} r={48} fill="none" stroke={color.surface2} strokeWidth={1.5} />
      <Circle cx={50} cy={50} r={38} fill="none" stroke={color.surface2} strokeWidth={1} />
      <Circle cx={50} cy={50} r={28} fill="none" stroke={color.surface2} strokeWidth={1} />
      <Circle cx={50} cy={50} r={18} fill="none" stroke={color.copper500} strokeWidth={1.5} />
      <Circle cx={50} cy={50} r={3} fill={color.copper500} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingBottom: spacing.xxl,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontFamily: fonts.displayItalic,
    fontStyle: "italic",
    fontSize: 56,
    color: color.copper300,
  },
  tagline: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: color.taupe,
    marginTop: spacing.sm,
  },
  footer: {
    gap: spacing.md,
  },
});
