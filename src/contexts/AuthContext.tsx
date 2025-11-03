import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as firebase from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../api/firebaseConfig";

/* import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
}); */

type AuthContextType = {
  user: firebase.User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  loginWithGoogle: () => void;
  errorMSG: string;
  setErrorMSG: (msg: string) => void;
  loading: boolean;
  loadingUser: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [errorMSG, setErrorMSG] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const getErrorMessage = (error: FirebaseError | unknown): string => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/missing-password":
          return "A senha é obrigatória.";
        case "auth/invalid-email":
          return "Email inválido.";
        case "auth/user-not-found":
          return "Usuário não encontrado.";
        case "auth/invalid-credential":
          return "Email ou Senha incorreta.";
        case "auth/email-already-in-use":
          return "Este email já está em uso.";
        case "auth/weak-password":
          return "A senha é muito fraca.";
        case "auth/argument-error":
          return "Erro na configuração do Google Sign-In. Verifique as credenciais.";
        default:
          return "Erro ao fazer login.";
      }
    }
    return "Erro desconhecido.";
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await firebase.signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error: ", error);
      setErrorMSG(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebase.signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error: ", error);
      setErrorMSG("Erro ao fazer logout.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await firebase.createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await firebase.updateProfile(user, { displayName: name });
      setUser(user);
    } catch (error) {
      console.error("Signup error: ", error);
      setErrorMSG(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    /*     try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken } = await GoogleSignin.getTokens();

        if (!idToken) {
          setErrorMSG("Falha ao obter token de autenticação do Google.");
          return;
        }

        const credential = firebase.GoogleAuthProvider.credential(idToken);
        await firebase.signInWithCredential(auth, credential);
      }
    } catch (error) {
      console.error("Google login error: ", error);
      setErrorMSG("Erro ao fazer login com Google.");
    } finally {
      setLoading(false);
    } */
  };

  useEffect(() => {
    const unsubscribe = firebase.onAuthStateChanged(auth, (u) => {
      setUser(u as firebase.User);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        loginWithGoogle,
        errorMSG,
        setErrorMSG,
        loading,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
