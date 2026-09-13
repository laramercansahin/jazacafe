import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContainer } from "../../../src/components/ScreenContainer";
import { StepHeader } from "../../../src/components/StepHeader";
import { Button } from "../../../src/components/Button";
import { useRegistration } from "../../../src/context/registration-context";
import { color, fonts, radius, spacing } from "../../../src/lib/theme";

const AGREEMENT_PARAGRAPHS = [
  "Jaza üyeliği; kafe/bar alanı, Demo Odası ve etkinliklere erişim sağlayan " +
    "kişisel bir üyeliktir ve başkasına devredilemez.",
  "Demo Odası rezervasyonları otomatik onaylanır; rezervasyon sadece üyelik " +
    "üzerinden yapılabilir. Üye, yanında Demo Odası'na en fazla 3, Jaza " +
    "Cafe'ye en fazla 5 misafir getirebilir; her misafirin adı ve e-postası " +
    "giriş ve QR pass için toplanır.",
  "Jaza Cafe girişi ileri tarihli bir rezervasyon değildir — yalnızca o " +
    "anki canlı doluluğa göre yer varsa QR kod alınır.",
  "Forum ve topluluk alanlarında, üyenin seçtiği kod adı görünür; ödeme, " +
    "admin ve iletişim tarafında üyenin gerçek adı ve iletişim bilgisi her " +
    "zaman geçerlidir.",
  "Üyelik ücreti seçilen kademeye (Basic/Premium) göre değişir ve iptal " +
    "politikası, mekan kuralları panosunda ayrıca belirtilir.",
];

export default function AgreementStep() {
  const { update } = useRegistration();
  const [accepted, setAccepted] = useState(false);

  function handleContinue() {
    update({ agreementAccepted: true });
    router.push("/(auth)/register/codename");
  }

  return (
    <ScreenContainer>
      <StepHeader
        step={1}
        total={4}
        title="Üyelik sözleşmesi"
        subtitle="Devam etmeden önce lütfen okuyun."
      />

      <ScrollView style={styles.box} showsVerticalScrollIndicator={false}>
        {AGREEMENT_PARAGRAPHS.map((paragraph, i) => (
          <Text key={i} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </ScrollView>

      <Pressable style={styles.checkRow} onPress={() => setAccepted((v) => !v)}>
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted && <Ionicons name="checkmark" size={12} color={color.onCopper} />}
        </View>
        <Text style={styles.checkLabel}>Üyelik sözleşmesini okudum ve kabul ediyorum.</Text>
      </Pressable>

      <Button label="Devam et" onPress={handleContinue} disabled={!accepted} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: color.surface1,
    borderWidth: 0.5,
    borderColor: color.border,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    maxHeight: 300,
  },
  paragraph: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: color.taupe,
    marginBottom: spacing.md,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: color.borderStrong,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: color.copper500,
    borderColor: color.copper500,
  },
  checkLabel: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: color.cream,
    lineHeight: 19,
  },
});
