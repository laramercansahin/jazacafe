import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import type { MembershipTier } from "@jaza/shared";
import { ScreenContainer } from "../../../src/components/ScreenContainer";
import { StepHeader } from "../../../src/components/StepHeader";
import { TierOption } from "../../../src/components/TierOption";
import { Button } from "../../../src/components/Button";
import { useRegistration } from "../../../src/context/registration-context";
import { registerMember, ApiError } from "../../../src/lib/api";
import { color, fonts, spacing } from "../../../src/lib/theme";

export default function TierStep() {
  const { state, update } = useRegistration();
  const [tier, setTier] = useState<MembershipTier | null>(state.tier);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleFinish() {
    if (!tier) return;
    setSubmitting(true);
    setError("");
    try {
      update({ tier });
      const result = await registerMember({
        email: state.email,
        phone: state.phone || undefined,
        password: state.password,
        fullName: state.fullName,
        codeName: state.codeName,
        tier,
        agreementAccepted: true,
      });
      router.replace({
        pathname: "/(auth)/register/success",
        params: { codeName: result.user.codeName, tier: result.user.tier },
      });
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Bir şeyler ters gitti, tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer>
      <StepHeader
        step={3}
        total={4}
        title="Üyelik kademeni seç"
        subtitle="İstediğin zaman admin panelinden yükseltebilirsin."
      />

      <TierOption tier="BASIC" selected={tier === "BASIC"} onSelect={() => setTier("BASIC")} />
      <TierOption tier="PREMIUM" selected={tier === "PREMIUM"} onSelect={() => setTier("PREMIUM")} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.spacer} />
      <Button
        label="Üyeliği tamamla"
        onPress={handleFinish}
        disabled={!tier}
        loading={submitting}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  error: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: color.error,
    marginTop: spacing.sm,
  },
  spacer: {
    flex: 1,
    minHeight: spacing.lg,
  },
});
