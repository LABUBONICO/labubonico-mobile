import { createContext, useEffect, useState } from "react";
import * as firebase from "firebase/auth";
import { auth } from "../api/firebaseConfig";

type AuthContextType = {
  user: firebase.User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      await firebase.signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logout = async () => {
    try {
      await firebase.signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await firebase.createUserWithEmailAndPassword(auth, email, password);
      user ? await firebase.updateProfile(user, { displayName: name }) : null;
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged(auth, (u) => {
      setUser(u as firebase.User);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
