import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./db";

export async function fetchTodayQuote(): Promise<{
  text: string;
  author?: string;
} | null> {
  const today = new Date();
  const dayKey = today.toISOString().slice(0, 10);
  const qRef = collection(db, "quotes");
  const q1 = query(qRef, where("dayKey", "==", dayKey));
  const s1 = await getDocs(q1);
  if (!s1.empty) return s1.docs[0].data() as any;
  const q2 = query(qRef, where("dayKey", "==", "*"));
  const s2 = await getDocs(q2);
  if (!s2.empty) return s2.docs[0].data() as any;
  return null;
}

export async function logBreath(uid: string, seconds: number) {
  const ref = collection(db, "users", uid, "sessions");
  await addDoc(ref, { timestamp: serverTimestamp(), seconds });
}

export async function addMood(uid: string, mood: string) {
  const ref = collection(db, "users", uid, "moods");
  await addDoc(ref, { timestamp: serverTimestamp(), mood });
}

export async function getLast7DaysMoods(uid: string) {
  const ref = collection(db, "users", uid, "moods");
  const q = query(ref, orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  // reduce to last 7 items by day
  const byDay = new Map<string, { day: string; mood: string }>();
  for (const it of items) {
    const t = (it.timestamp as any as Timestamp) ?? null;
    const day = t?.toDate
      ? t.toDate().toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    if (!byDay.has(day)) byDay.set(day, { day, mood: it.mood });
    if (byDay.size >= 7) break;
  }
  const arr = Array.from(byDay.values()).sort((a, b) =>
    a.day.localeCompare(b.day)
  );
  // map moods to numeric score
  const map: Record<string, number> = { "😔": 1, "😐": 2, "😊": 3 };
  return arr.map((d) => ({ x: d.day.slice(5), y: map[d.mood] ?? 2 }));
}

export async function trackSoundPlay(uid: string, sound: string) {
  const ref = doc(db, "users", uid, "soundStats", sound);
  const existing = await getDoc(ref);
  if (existing.exists()) {
    const data = existing.data() as any;
    await setDoc(ref, { sound, plays: (data.plays ?? 0) + 1 }, { merge: true });
  } else {
    await setDoc(ref, { sound, plays: 1 }, { merge: true });
  }
}
