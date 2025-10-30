import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

const Camera = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [flashOn, setFlashOn] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={{ flex: 1, width: "100%", height: "100%" }}
        facing="back"
        enableTorch={flashOn}
        ref={cameraRef}
      />
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          gap: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePicture}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFlashOn((prev) => !prev)}>
            <Ionicons
              name={flashOn ? "flash" : "flash-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white" }}>
          Tire fotos de notas fiscais, boletos...
        </Text>
      </View>

      <Modal visible={photo !== null} animationType="slide">
        <View style={styles.container}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          )}
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 20,
              right: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.buttonIcon}
              onPress={() => {
                setPhoto(null);
              }}
            >
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonIcon, { marginTop: 10 }]}
              onPress={() => {
                if (photo) {
                  navigation.navigate("Details", { photo });
                  setPhoto(null);
                }
              }}
            >
              <Ionicons name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Camera;
