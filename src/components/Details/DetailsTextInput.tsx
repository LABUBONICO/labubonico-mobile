import { TextInput } from "react-native";
import { JSONResponse } from "../../types";

type DetailsTextInputProps = {
  item: string | number;
  index: number;
  response: JSONResponse;
  setResponse: React.Dispatch<React.SetStateAction<JSONResponse | undefined>>;
  numeric?: boolean;
};

const DetailsTextInput = ({
  item,
  index,
  response,
  setResponse,
  numeric,
}: DetailsTextInputProps) => {
  return (
    <TextInput
      value={String(item)}
      keyboardType={numeric ? "numeric" : "default"}
      onChangeText={(text) => {
        const newItems = [...(response.items || [])];
        numeric
          ? (newItems[index].price = Number(text))
          : (newItems[index].name = text);
        setResponse({ ...response, items: newItems });
      }}
    />
  );
};

export default DetailsTextInput;
