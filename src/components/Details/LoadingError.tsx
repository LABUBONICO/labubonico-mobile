import { JSONResponse } from "../../types";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

type LoadingErrorProps = {
  response: JSONResponse | undefined;
};

const LoadingError = ({ response }: LoadingErrorProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/details_loading.png")}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
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
