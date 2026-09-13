import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { color, fonts, radius, spacing } from "../lib/theme";

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={color.taupeDim}
        style={[styles.field, !!error && styles.fieldInvalid, style]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: color.taupeDim,
    marginBottom: spacing.sm,
  },
  field: {
    backgroundColor: color.surface2,
    borderWidth: 0.5,
    borderColor: color.border,
    borderRadius: radius.input,
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
    color: color.cream,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  fieldInvalid: {
    borderColor: color.error,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: color.error,
    marginTop: spacing.xs,
  },
});
