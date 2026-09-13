import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { ScreenContainer } from "../../../src/components/ScreenContainer";
import { StepHeader } from "../../../src/components/StepHeader";
import { TextField } from "../../../src/components/TextField";
import { Button } from "../../../src/components/Button";
import { useRegistration } from "../../../src/context/registration-context";
import { spacing } from "../../../src/lib/theme";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AccountStep() {
  const { state, update } = useRegistration();
  const [fullName, setFullName] = useState(state.fullName);
  const [email, setEmail] = useState(state.email);
  const [phone, setPhone] = useState(state.phone);
  const [password, setPassword] = useState(state.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleContinue() {
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) nextErrors.fullName = "Ad soyad gerekli";
    if (!EMAIL_RE.test(email)) nextErrors.email = "Geçerli bir e-posta girin";
    if (password.length < 8) nextErrors.password = "En az 8 karakter olmalı";
    if (password !== confirmPassword) nextErrors.confirmPassword = "Şifreler eşleşmiyor";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    update({ fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), password });
    router.push("/(auth)/register/agreement");
  }

  return (
    <ScreenContainer>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <StepHeader
          step={0}
          total={4}
          title="Hesabını oluştur"
          subtitle="Ödeme ve iletişim tarafında her zaman gerçek adın görünür kalır."
          canGoBack={false}
        />

        <TextField
          label="Ad Soyad"
          placeholder="Elif Yılmaz"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          autoCapitalize="words"
        />
        <TextField
          label="E-posta"
          placeholder="elif@ornek.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField
          label="Telefon (opsiyonel)"
          placeholder="+90 5xx xxx xx xx"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextField
          label="Şifre"
          placeholder="En az 8 karakter"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />
        <TextField
          label="Şifre (tekrar)"
          placeholder="Şifreni tekrar gir"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
        />

        <View style={styles.spacer} />
        <Button label="Devam et" onPress={handleContinue} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: spacing.md,
  },
});
