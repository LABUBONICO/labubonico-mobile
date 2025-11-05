import { Image, Modal, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../styles";
import { CameraCapturedPicture, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { paperTheme } from "../theme/theme";

const Camera = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [flashOn, setFlashOn] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
      });
      setPhoto(photo);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          borderRadius: paperTheme.borderRadius.lg,
        }}
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
          gap: paperTheme.spacing.xl,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: paperTheme.colors.primary,
              padding: paperTheme.spacing.lg,
              borderRadius: paperTheme.borderRadius.full,
            }}
            onPress={handleTakePicture}
          >
            <Ionicons name="camera" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFlashOn((prev) => !prev)}>
            <Ionicons
              name={flashOn ? "flash" : "flash-off"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Text variant="labelMedium" style={{ color: "white" }}>
          Tire fotos de notas fiscais, boletos...
        </Text>
      </View>

      <Modal visible={photo !== null} animationType="slide">
        <View style={styles.container}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: paperTheme.borderRadius.lg,
              }}
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
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              {...paperTheme.buttons.contained}
              buttonColor={paperTheme.colors.surface}
              style={{ flex: 1 }}
              onPress={() => setPhoto(null)}
            >
              Cancelar
            </Button>
            <Button
              {...paperTheme.buttons.contained}
              buttonColor={paperTheme.colors.success}
              style={{ flex: 1 }}
              onPress={() => {
                if (photo) {
                  navigation.navigate("Details", { photo });
                  setPhoto(null);
                }
              }}
            >
              Continuar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Camera;
