import { useState, useEffect } from "react";
import {
	Text,
	TextInput,
	View,
	ScrollView,
	StyleSheet,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	getCurrentPositionAsync,
	useForegroundPermissions,
	PermissionStatus,
} from "expo-location";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";

import MainBtn from "../ui/MainBtn";
import TrashBtn from "../ui/TrashBtn";
import { COLORS } from "../../common/constants";
import ImageTaker from "./ImageTaker";
import { uploadPhoto } from "../../utils/upLoadPhoto";
import useAuth from "../../hooks/useAuth";
import Loading from "../ui/Loading";
import savePost from "../../utils/savePost";

export default function PostForm() {
	const { user } = useAuth();
	const navigation = useNavigation();
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [location, setLocation] = useState(null);
	const [picture, setPicture] = useState(null);

	//TODO: const [cameraIconDark, setCameraDark] = useState(true);
	const [locationPermission, requestPermission] = useForegroundPermissions();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [hasLocationPermission, setHasLocationPermission] = useState();

  const newPostReady = !!title && !!place && !!location && !!picture;
  const postNotEmpty = !!picture || title?.trim() || place?.trim();

	function clearPost() {
		setPicture(null);
		setPlace("");
		setTitle("");
		setLocation(null); //		setImageURL(null);
	}

	function toTrashHandler() {
		clearPost();
	}

	async function verifyLocationPermissions() {
		if (locationPermission?.status === PermissionStatus.GRANTED) {
			return true;
		}

		const permissionResponse = await requestPermission();
		if (permissionResponse.granted) {
			return true;
		}

		return false;
	}

	useEffect(() => {
		(async () => {
			const locationPermissions = await verifyLocationPermissions();
			setHasLocationPermission(locationPermissions);
		})();
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
		})();
	}, []);

	if (
		hasCameraPermission === undefined ||
		hasLocationPermission === undefined
	) {
		return <Loading msg="Requesting permissions..." />;
	} else if (!hasCameraPermission || !hasLocationPermission) {
		return (
			<Text>
				Not granted permissions for: {!hasCameraPermission && " camera"}
				{!hasLocationPermission && " location"}. Please change this in settings.
			</Text>
		);
	}

	async function takePictureHandler(uri) {
		setPicture(uri);
		const location = await getCurrentPositionAsync();
		setLocation({
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		});
	}

	async function publishHandler() {
		//const newPostReady = !!title && !!place && !!location && !!picture;
		if (!newPostReady) {
			Alert.alert(
				"New post not completed!",
				" Pls take picture and fill in all required fields!"
			);
			return;
		}

		const url = await uploadPhoto(picture);
		savePost(user.uid, title, place, location, url);
		clearPost();
		navigation.navigate("Posts");
	}

	//TODO: is Upload photo a button? Nothing about it in Tech specs...

	return (
		<ScrollView
			style={styles.form}
			contentContainerStyle={styles.contentContainer}
		>
			<View style={styles.container}>
				<View style={styles.controlsContainer}>
					<ImageTaker picture={picture} onTakePicture={takePictureHandler} />
					<View style={styles.textContainer}>
						<Text style={styles.text}>Завантажте фото</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							value={title}
							placeholder="Назва..."
							placeholderTextColor={COLORS.inactive}
							style={styles.input}
							onChangeText={(value) => setTitle(value)}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Feather
							name="map-pin"
							size={24}
							color={COLORS.inactive}
							style={styles.icon}
						/>
						<TextInput
							value={place}
							placeholder="Місцевість..."
							placeholderTextColor={COLORS.inactive}
							style={styles.input}
							onChangeText={(value) => setPlace(value)}
						/>
					</View>
					<View style={styles.mainBtnContainer}>
						<MainBtn
							active={newPostReady}
							title={"Опубліковати"}
							onPress={publishHandler}
						/>
					</View>
				</View>
				<TrashBtn
					active={postNotEmpty}
					style={styles.positionTrash}
					onPress={toTrashHandler}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	form: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 34,
		backgroundColor: COLORS.mainBkg,
	},
	textContainer: { marginTop: 8, marginBottom: 32 },
	container: { flex: 1 },
	controlsContainer: {
		flex: 1,
	},
	inputContainer: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.borderGray,
	},
	mainBtnContainer: {
		marginTop: 16,
	},
	text: {
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		color: COLORS.inactive,
		lineHeight: 19,
	},
	input: {
		width: "100%",
		height: 50,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		color: COLORS.mainText,
	},
	icon: { marginRight: 4 },
	positionTrash: {
		alignSelf: "center",
	},
});
