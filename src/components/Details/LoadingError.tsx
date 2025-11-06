import { JSONResponse } from "../../types";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { paperTheme } from "../../theme/theme";

type LoadingErrorProps = {
  response: JSONResponse | undefined;
};

const LoadingError = ({ response }: LoadingErrorProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: paperTheme.spacing.md,
      }}
    >
      <Image
        source={require("../../../assets/images/labubonico_logo.png")}
        style={{ width: 40, height: 40 }}
      />
      <Text variant="displayMedium" style={{ textAlign: "center" }}>
        {response ? response.errorMessage : "labubonico está pensando..."}
      </Text>
    </View>
  );
};

export default LoadingError;
