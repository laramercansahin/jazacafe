import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MembershipTier } from "@jaza/shared";
import { color, fonts, radius, spacing } from "../lib/theme";

const COPY: Record<MembershipTier, { title: string; perks: string[] }> = {
  BASIC: {
    title: "Basic",
    perks: ["Jaza Cafe girişi", "Etkinliklere katılım", "Forum erişimi"],
  },
  PREMIUM: {
    title: "Premium",
    perks: [
      "Demo Odası rezervasyonunda öncelik",
      "Hi-Fi & Hi-End danışmanlık randevusu",
      "Basic'teki her şey",
    ],
  },
};

export function TierOption({
  tier,
  selected,
  onSelect,
}: {
  tier: MembershipTier;
  selected: boolean;
  onSelect: () => void;
}) {
  const copy = COPY[tier];
  const isPremium = tier === "PREMIUM";
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>{copy.title}</Text>
        <View
          style={[
            styles.tag,
            isPremium ? styles.tagPremium : styles.tagBasic,
          ]}
        >
          <Text
            style={[
              styles.tagLabel,
              { color: isPremium ? color.amberGlow : color.taupe },
            ]}
          >
            {copy.title}
          </Text>
        </View>
      </View>
      {copy.perks.map((perk) => (
        <Text key={perk} style={styles.perk}>
          · {perk}
        </Text>
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface1,
    borderWidth: 0.5,
    borderColor: color.border,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardSelected: {
    borderColor: color.copper500,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.displayItalic,
    fontStyle: "italic",
    fontSize: 20,
    color: color.cream,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  tagPremium: {
    backgroundColor: "rgba(232,168,104,0.16)",
  },
  tagBasic: {
    backgroundColor: "rgba(183,164,145,0.14)",
  },
  tagLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  perk: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: color.taupe,
    marginTop: 2,
  },
});
