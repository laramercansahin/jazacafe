import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "../../../src/components/ScreenContainer";
import { StepHeader } from "../../../src/components/StepHeader";
import { TextField } from "../../../src/components/TextField";
import { Button } from "../../../src/components/Button";
import { useRegistration } from "../../../src/context/registration-context";
import { color, fonts, spacing } from "../../../src/lib/theme";

const SUGGESTIONS = ["Gece Kuşu", "Bakır Yolcu", "Sessiz Plak", "Amber Nota", "Uzak Rıhtım"];

export default function CodeNameStep() {
  const { state, update } = useRegistration();
  const [codeName, setCodeName] = useState(state.codeName);
  const [error, setError] = useState("");

  function handleContinue() {
    const trimmed = codeName.trim();
    if (trimmed.length < 2) {
      setError("En az 2 karakter olmalı");
      return;
    }
    update({ codeName: trimmed });
    router.push("/(auth)/register/tier");
  }

  return (
    <ScreenContainer>
      <StepHeader
        step={2}
        total={4}
        title="Bir kod adı seç"
        subtitle="Forum ve topluluk içinde gerçek adın yerine bu görünür. Ödeme ve admin tarafında gerçek adın kalır."
      />

      <TextField
        label="Kod adı"
        placeholder="Gece Kuşu"
        value={codeName}
        onChangeText={(v) => {
          setCodeName(v);
          if (error) setError("");
        }}
        error={error}
      />

      <Text style={styles.suggestLabel}>Öneriler</Text>
      <View style={styles.suggestRow}>
        {SUGGESTIONS.map((s) => (
          <Text
            key={s}
            style={styles.suggestPill}
            onPress={() => {
              setCodeName(s);
              setError("");
            }}
          >
            {s}
          </Text>
        ))}
      </View>

      <View style={styles.spacer} />
      <Button label="Devam et" onPress={handleContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  suggestLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: color.taupeDim,
    marginBottom: spacing.sm,
  },
  suggestRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  suggestPill: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: color.taupe,
    borderWidth: 0.5,
    borderColor: color.borderStrong,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
    minHeight: spacing.xxl,
  },
});
