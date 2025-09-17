import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";

const PHASES = [
  { label: "Inhale", seconds: 4, color: "#34D399" }, // green
  { label: "Hold", seconds: 4, color: "#FACC15" }, // yellow
  { label: "Exhale", seconds: 4, color: "#60A5FA" }, // blue
];

export default function BreathingCircle({
  onCompleteCycle,
}: {
  onCompleteCycle?: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [counter, setCounter] = useState(PHASES[0].seconds);

  useEffect(() => {
    const id = setInterval(() => setCounter((c) => (c > 1 ? c - 1 : c)), 1000);
    return () => clearInterval(id);
  }, [phaseIndex]);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: phaseIndex === 2 ? 1 : 1.3,
      duration: PHASES[phaseIndex].seconds * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) return;
      const next = (phaseIndex + 1) % PHASES.length;
      setPhaseIndex(next);
      setCounter(PHASES[next].seconds);
      if (next === 0) onCompleteCycle?.();
    });
  }, [phaseIndex]);

  const phase = PHASES[phaseIndex];

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          height: 220,
          width: 220,
          borderRadius: 110,
          backgroundColor: `${phase.color}40`, // transparent fill
          borderWidth: 3,
          borderColor: phase.color,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: phase.color,
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600", color: phase.color }}>
          {phase.label}
        </Text>
        <Text style={{ fontSize: 36, fontWeight: "bold", color: phase.color }}>
          {counter}s
        </Text>
      </Animated.View>
    </View>
  );
}
