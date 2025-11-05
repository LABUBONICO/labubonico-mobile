import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { database } from "../api/firebaseConfig";
import * as firestore from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export type Category = {
  color: string;
  name: string;
};

type CategoriesType = {
  categories: Category[];
  updateCategories: (categories: Category[]) => Promise<void>;
  loading: boolean;
};

const CategoriesContext = createContext<CategoriesType>({} as CategoriesType);

const CategoriesProvider = ({ children }: PropsWithChildren) => {
  const { user } = useContext(AuthContext);
  const collection = firestore.collection(database, "categories");
  const [categories, setCategories] = useState<Category[]>([
    { color: "#1FC56F", name: "ALIMENTAÇÃO" },
    { color: "#FF9A00", name: "TRANSPORTE" },
    { color: "#FC5D8B", name: "LAZER" },
    { color: "#C75FFE", name: "OUTROS" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const doc = firestore.doc(collection, user?.uid);
      const data = await firestore.getDoc(doc);
      console.log("Categorias do usuário:", data?.data());
      if (!data.exists()) {
        await updateCategories(categories);
        return;
      }
      setCategories(data.data().categories as Category[]);
    } catch (error) {
      console.log("Erro ao buscar categorias do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategories = async (categories: Category[]) => {
    try {
      setLoading(true);
      const doc = firestore.doc(collection, user?.uid);
      await firestore.setDoc(doc, { categories });
      console.log("Categorias atualizadas com sucesso!", categories);
      setCategories(categories);
    } catch (error) {
      console.log("Erro ao adicionar categoria do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getCategories();
    }
  }, [user?.uid]);

  return (
    <CategoriesContext.Provider
      value={{ categories, updateCategories, loading }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
