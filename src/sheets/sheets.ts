import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import CategorieSheet from "../components/sheets/CategorieSheet";

registerSheet("CategorieSheet", CategorieSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    CategorieSheet: SheetDefinition<{
      payload?: {
        index: number;
      };
    }>;
  }
}
