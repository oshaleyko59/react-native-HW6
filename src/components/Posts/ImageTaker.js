import { useState, useRef, useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";

import Loading from "../ui/Loading";
import CameraBtn from "../ui/CameraBtn";

export default function ImageTaker({ picture, onTakePicture }) {
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const cameraRef = useRef();

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
		})();
	}, []);

	if (hasCameraPermission === undefined) {
		return <Loading msg="Requesting permissions..." />;
	} else if (!hasCameraPermission) {
		return (
			<Text>
				Permission for camera not granted. Please change this in settings.
			</Text>
		);
	}

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
				<Camera ref={cameraRef} ration="16:9" style={styles.camera}>
					<CameraBtn dark={false} onPress={takePhotoHandler} />
				</Camera>
			)}
		</View>
	);
}

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
