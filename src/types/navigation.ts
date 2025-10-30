import { CameraCapturedPicture } from "expo-camera";

export type MainStackParamList = {
  Home: undefined;
  Chat: undefined;
  Camera: undefined;
  Details: { photo: CameraCapturedPicture | null };
  Profile: undefined;
};
