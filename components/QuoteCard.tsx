import { Text, View } from "react-native";

export default function QuoteCard({
  text,
  author,
}: {
  text?: string;
  author?: string;
}) {
  return (
    <View className="rounded-2xl bg-white/80 dark:bg-zinc-900 p-4 shadow">
      <Text className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        {text ?? "Take a deep breath."}
      </Text>
      {author ? (
        <Text className="mt-2 text-zinc-500 dark:text-zinc-400">
          — {author}
        </Text>
      ) : null}
    </View>
  );
}
