import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import styles from "../styles";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

const Profile = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text variant="displayMedium">{user?.displayName}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Categories")}
      >
        <Ionicons name="grid" size={24} color="black" />
        <Text style={styles.buttonText}>Categorias</Text>
        <FontAwesome5 name="angle-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Ionicons name="exit" size={24} color="black" />
        <Text style={styles.buttonText}>Logout</Text>
        <FontAwesome5 name="angle-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
