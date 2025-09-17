import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const MOODS = [
  { emoji: "😔", color: "#60A5FA" }, // blue for sad
  { emoji: "😐", color: "#FBBF24" }, // yellow for neutral
  { emoji: "😊", color: "#34D399" }, // green for happy
] as const;

export type Mood = (typeof MOODS)[number]["emoji"];

export default function MoodPicker({ onPick }: { onPick: (m: Mood) => void }) {
  const [current, setCurrent] = useState<Mood>("😊");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {MOODS.map((m) => {
        const isActive = current === m.emoji;

        return (
          <Pressable
            key={m.emoji}
            onPress={() => {
              setCurrent(m.emoji);
              onPick(m.emoji);
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isActive ? m.color : "rgba(0,0,0,0.05)",
              borderRadius: 50,
              width: 80,
              height: 80,
              shadowColor: m.color,
              shadowOpacity: isActive ? 0.5 : 0,
              shadowRadius: 10,
              elevation: isActive ? 6 : 0,
              transform: [{ scale: isActive ? 1.1 : 1 }],
            }}
          >
            <Text style={{ fontSize: 40 }}>{m.emoji}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
