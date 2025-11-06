import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import baseStyles from "../styles";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button, Text } from "react-native-paper";
import { paperTheme } from "../theme/theme";
import { AntDesign } from "@expo/vector-icons";

const Login = () => {
  const { login, register, loginWithGoogle, errorMSG, setErrorMSG, loading } =
    useContext(AuthContext);
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Image
        source={require("../../assets/images/login_gradient.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/labubonico_logo.png")}
            style={styles.logo}
          />
          <Text variant="displayMedium">labubonico</Text>
        </View>
        <View style={styles.toggleButtonContainer}>
          <Text variant="headlineLarge">
            {signup ? "Cadastro" : "Boas-Vindas"}
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.inputsWrapper}>
              {signup && (
                <TextInput
                  style={baseStyles.input}
                  placeholder="Nome"
                  onChangeText={setName}
                  onFocus={() => setErrorMSG("")}
                />
              )}
              <TextInput
                style={baseStyles.input}
                placeholder="Email"
                onChangeText={setEmail}
                onFocus={() => setErrorMSG("")}
              />
              <TextInput
                style={baseStyles.input}
                placeholder="Senha"
                onChangeText={setPassword}
                onFocus={() => setErrorMSG("")}
                secureTextEntry
              />
            </View>
          </View>
          <Button
            {...paperTheme.buttons.contained}
            onPress={() => {
              signup ? register(name, email, password) : login(email, password);
            }}
            loading={loading}
          >
            {signup ? "Cadastrar" : "Entrar"}
          </Button>
          {errorMSG && <Text variant="labelLarge">{errorMSG}</Text>}
          <Text variant="labelMedium">OU</Text>
          <Button {...paperTheme.buttons.outlined} onPress={loginWithGoogle}>
            <AntDesign name="google" size={24} />
            Entrar com o Google
          </Button>
        </View>
        <TouchableOpacity
          onPress={() => setSignup(!signup)}
          style={styles.footerButton}
        >
          <Text variant="labelLarge">
            {signup ? "Já tem uma conta? Login" : "Primeira vez aqui? Cadastro"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    position: "absolute",
  },
  mainContainer: {
    ...baseStyles.container,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: paperTheme.spacing.xl,
  },
  logo: {
    width: 25,
    height: 25,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    gap: paperTheme.spacing.md,
    padding: paperTheme.spacing.xl,
    borderRadius: paperTheme.borderRadius.md,
    alignItems: "center",
  },
  inputsWrapper: {
    width: "100%",
    gap: paperTheme.spacing.md,
  },
  toggleButtonContainer: {
    width: "100%",
    gap: paperTheme.spacing.md,
    alignItems: "center",
  },
  footerButton: {
    marginTop: paperTheme.spacing.sm,
  },
});

export default Login;
