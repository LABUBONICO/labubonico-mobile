import { Text, View } from "react-native";
import styles from "../styles";
import { MainStackParamList } from "../types/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Home = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Chat")}>Go to Chat</Text>
      <Text onPress={() => navigation.navigate("Camera")}>Go to Camera</Text>
      <Text onPress={() => navigation.navigate("Details")}>Go to Details</Text>
      <Text onPress={() => navigation.navigate("Profile")}>Go to Profile</Text>
    </View>
  );
};

export default Home;
