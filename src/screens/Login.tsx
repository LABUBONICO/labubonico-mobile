import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login, register } = useContext(AuthContext);
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/images/labubonico_logo.png")} />
        <Text>labubonico</Text>
      </View>
      <View>
        <Text>{signup ? "Cadastro" : "Boas-Vindas"}</Text>
        <View>
          {signup && (
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onChangeText={setName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            signup ? register(name, email, password) : login(email, password);
          }}
        >
          <Text>{signup ? "Cadastrar" : "Entrar"}</Text>
        </TouchableOpacity>
        <Text>OU</Text>
        <TouchableOpacity>
          <Text>Entrar com o Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setSignup(!signup)}>
        <Text>
          {signup ? "Já tem uma conta? Login" : "Primeira vez aqui? Cadastro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
