import { Pressable, Text } from "react-native";

export default function SoundTile({
  label,
  color = "#60A5FA",
  isPlaying,
  onPlay,
}: {
  label: string;
  color?: string;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <Pressable
      onPress={onPlay}
      style={{
        backgroundColor: isPlaying ? color : "#E5E7EB",
        padding: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: isPlaying ? "white" : "#374151",
        }}
      >
        {isPlaying ? `⏸️ Stop` : `▶️ ${label}`}
      </Text>
    </Pressable>
  );
}
