import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BreathingCircle from "../components/BreathingCircle";
import { useAuth } from "../context/AuthProvider";
import { logBreath } from "../lib/firebase";

export default function Breath() {
  const { user } = useAuth();
  const [cycles, setCycles] = useState(0);

  const onCompleteCycle = useCallback(() => {
    setCycles((c) => c + 1);
  }, []);

  const save = async () => {
    if (!user) return;
    // one 4-4-4 cycle ≈ 12s
    await logBreath(user.uid, cycles * 12);
    setCycles(0);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#E0F2FE", // light blue background
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "#0EA5E9", // cyan-600
        }}
      >
        🌬️ Breathing Exercise
      </Text>

      <BreathingCircle onCompleteCycle={onCompleteCycle} />

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text
          style={{
            fontSize: 18,
            color: "#334155", // slate-700
            marginBottom: 12,
          }}
        >
          Completed Cycles:{" "}
          <Text style={{ fontWeight: "bold", color: "#0F766E" }}>{cycles}</Text>
        </Text>

        <Pressable
          onPress={save}
          style={{
            backgroundColor: "#F472B6", // pink
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 30,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "white",
            }}
          >
            💾 Save Session
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
