import { View } from "react-native";
// import {
//   VictoryAxis,
//   VictoryChart,
//   VictoryLine,
//   VictoryScatter,
//   VictoryTheme,
// } from "victory-native";

export default function WeeklyMoodChart({
  data,
}: {
  data: { x: string; y: number }[];
}) {
  return (
    <View className="bg-white/80 dark:bg-zinc-900 rounded-2xl p-2">
      zcxvzv{" "}
      {/* <VictoryChart theme={VictoryTheme.material} domain={{ y: [0.5, 3.5] }}>
        <VictoryAxis
          tickFormat={(t) => t}
          style={{ tickLabels: { fontSize: 10 } }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[1, 2, 3]}
          tickFormat={["😔", "😐", "😊"]}
        />
        <VictoryLine data={data} />
        <VictoryScatter data={data} size={4} />
      </VictoryChart> */}
    </View>
  );
}
