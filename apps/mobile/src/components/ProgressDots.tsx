import React from "react";
import { StyleSheet, View } from "react-native";
import { color, spacing } from "../lib/theme";

export function ProgressDots({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.xxl,
  },
  dot: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: color.surface2,
  },
  dotActive: {
    backgroundColor: color.copper500,
  },
});
