import { useAuth } from "../context/AuthProvider";
import { trackSoundPlay } from "../lib/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import SoundTile from "../components/SoundTitle";

const assets = {
  birds: require("../assets/sounds/birds.mp3"),
  ocean: require("../assets/sounds/ocean.mp3"),
  rain: require("../assets/sounds/rain.mp3"),
};

type SoundKey = keyof typeof assets;

export default function Sounds() {
  const { user } = useAuth();
  const [active, setActive] = useState<SoundKey | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const play = async (key: SoundKey) => {
    // If the same tile is tapped again -> stop it
    if (active === key && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setActive(null);
      return;
    }

    // If another sound is playing -> stop & unload
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }

    // Load new sound
    const { sound: newSound } = await Audio.Sound.createAsync(assets[key]);
    setSound(newSound);
    setActive(key);
    await newSound.playAsync();

    // Track play
    user && trackSoundPlay(user.uid, key);

    // Auto-reset when finished
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded || status.didJustFinish) {
        setActive(null);
        newSound.unloadAsync();
        setSound(null);
      }
    });
  };

  return (
    <LinearGradient colors={["#93C5FD", "#6EE7B7"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 24,
            color: "white",
          }}
        >
          🎶 Soothing Sounds
        </Text>

        <View style={{ gap: 16 }}>
          <SoundTile
            label="🌧️ Rain"
            color="#60A5FA"
            isPlaying={active === "rain"}
            onPlay={() => play("rain")}
          />
          <SoundTile
            label="🌊 Ocean"
            color="#3B82F6"
            isPlaying={active === "ocean"}
            onPlay={() => play("ocean")}
          />
          <SoundTile
            label="🐦 Birds"
            color="#34D399"
            isPlaying={active === "birds"}
            onPlay={() => play("birds")}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
