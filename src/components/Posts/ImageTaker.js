import { useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

import CameraBtn from "../ui/CameraBtn";

export default function ImageTaker({ picture, onTakePicture }) {
	const cameraRef = useRef();

	async function takePhotoHandler() {
		const options = {
			quality: 0.5,
			base64: false, //true,
			exif: false,
		};

    const newPhoto = await cameraRef.current.takePictureAsync(options);
		await onTakePicture(newPhoto.uri);
  }

	return (
		<View style={styles.container}>
			{picture ? (
				<Image
					source={{uri:picture}}
					style={styles.camera}
				/>
			) : (
				<Camera ref={cameraRef} style={styles.camera}>
					<CameraBtn dark={false} onPress={takePhotoHandler} />
				</Camera>
			)}
		</View>
	);
}
//FIXME: android preview is distorted 
const styles = StyleSheet.create({
	container: {
	},
	camera: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
});
