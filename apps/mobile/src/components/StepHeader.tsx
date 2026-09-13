import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ProgressDots } from "./ProgressDots";
import { color, fonts, spacing } from "../lib/theme";

export function StepHeader({
  step,
  total,
  title,
  subtitle,
  canGoBack = true,
}: {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  canGoBack?: boolean;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        {canGoBack && router.canGoBack() ? (
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={16} color={color.cream} />
          </Pressable>
        ) : (
          <View style={styles.backBtn} />
        )}
      </View>
      <ProgressDots step={step} total={total} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.xxl,
  },
  topRow: {
    marginBottom: spacing.lg,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: color.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.displayItalic,
    fontStyle: "italic",
    fontSize: 26,
    color: color.cream,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: color.taupeDim,
    lineHeight: 19,
  },
});
