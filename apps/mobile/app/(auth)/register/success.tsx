import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer } from "../../../src/components/ScreenContainer";
import { Button } from "../../../src/components/Button";
import { color, fonts, spacing } from "../../../src/lib/theme";

export default function SuccessStep() {
  const { codeName, tier } = useLocalSearchParams<{ codeName: string; tier: string }>();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.body}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={28} color={color.success} />
        </View>
        <Text style={styles.title}>Jaza'ya hoş geldin</Text>
        <Text style={styles.subtitle}>
          {codeName ? `${codeName} · ` : ""}
          {tier === "PREMIUM" ? "Premium üye" : "Basic üye"}
        </Text>
      </View>

      <Button label="Devam et" onPress={() => router.replace("/")} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    paddingVertical: spacing.xxl,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(143,174,125,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.displayItalic,
    fontStyle: "italic",
    fontSize: 26,
    color: color.cream,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: color.taupe,
  },
});
