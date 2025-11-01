import { JSONResponse } from "../../types";
import { Image, Text, View } from "react-native";

type LoadingErrorProps = {
  response: JSONResponse | undefined;
};

const LoadingError = ({ response }: LoadingErrorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/labubonico_logo.png")}
        style={{ width: 40, height: 40 }}
      />
      <Text>
        {response ? response.errorMessage : "labubonico está pensando..."}
      </Text>
    </View>
  );
};

export default LoadingError;
