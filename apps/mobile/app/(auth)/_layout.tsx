import { Stack } from "expo-router";
import { RegistrationProvider } from "../../src/context/registration-context";
import { color } from "../../src/lib/theme";

export default function AuthLayout() {
  return (
    <RegistrationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: color.bg },
        }}
      />
    </RegistrationProvider>
  );
}
