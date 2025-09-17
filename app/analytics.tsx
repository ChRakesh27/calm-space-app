import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import WeeklyMoodChart from "../components/WeeklyMoodChart";
import { useAuth } from "../context/AuthProvider";
import { getLast7DaysMoods } from "../lib/firebase";

export default function Analytics() {
  const { user } = useAuth();
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    if (!user) return;
    getLast7DaysMoods(user.uid).then(setData);
  }, [user]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-4">Weekly Mood</Text>
      <WeeklyMoodChart data={data} />
    </ScrollView>
  );
}
