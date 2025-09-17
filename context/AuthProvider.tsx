import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import "../lib/firebase";

interface AuthCtx {
  user: User | null;
  loading: boolean;
}
const Ctx = createContext<AuthCtx>({ user: null, loading: true });

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    // Auto anonymous sign-in
    signInAnonymously(auth).catch(console.error);
    return () => unsub();
  }, []);

  return <Ctx.Provider value={{ user, loading }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
