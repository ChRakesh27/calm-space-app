import MoodPicker from "@/components/MoodPicker";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { addMood } from "../lib/firebase";

export default function Mood() {
  const { user } = useAuth();
  const [picked, setPicked] = useState<any | null>(null);

  const save = async () => {
    if (!user || !picked) return;
    await addMood(user.uid, picked);
    setPicked(null);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        flexGrow: 1,
        backgroundColor: "#FDF4FF", // soft lavender
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 24,
          color: "#7C3AED", // purple-600
        }}
      >
        😊 Mood Tracker
      </Text>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
          marginBottom: 30,
        }}
      >
        <MoodPicker onPick={setPicked} />
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={save}
          style={{
            backgroundColor: picked ? "#F472B6" : "#D1D5DB", // pink if picked, gray if disabled
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 30,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: picked ? "white" : "#6B7280",
            }}
          >
            {picked ? `💾 Save ${picked}` : "Pick a mood"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
