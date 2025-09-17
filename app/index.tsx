import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import QuoteCard from "../components/QuoteCard";

export default function Home() {
  const quote = { text: "Stay calm and breathe", author: "Unknown" };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        backgroundColor: "#F0F9FF", // light blue background
        flexGrow: 1,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "#2563EB", // deep blue
        }}
      >
        🌸 CalmSpace
      </Text>

      <QuoteCard text={quote?.text} author={quote?.author} />

      <View style={{ marginTop: 30 }}>
        <Link href="/breath" asChild>
          <Pressable
            style={{
              padding: 16,
              backgroundColor: "#93C5FD", // light blue
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#1E3A8A" }}>
              🌬️ Breathing Exercise
            </Text>
          </Pressable>
        </Link>

        <Link href="/mood" asChild>
          <Pressable
            style={{
              padding: 16,
              backgroundColor: "#FBCFE8", // pink
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#831843" }}>
              😊 Mood Tracker
            </Text>
          </Pressable>
        </Link>

        <Link href="/sounds" asChild>
          <Pressable
            style={{
              padding: 16,
              backgroundColor: "#A7F3D0", // mint green
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#065F46" }}>
              🎶 Soothing Sounds
            </Text>
          </Pressable>
        </Link>

        <Link href="/analytics" asChild>
          <Pressable
            style={{
              padding: 16,
              backgroundColor: "#FDE68A", // soft yellow
              borderRadius: 12,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#92400E" }}>
              📈 Weekly Analytics
            </Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}
