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
import { Feather } from "@expo/vector-icons";

import MainBtn from "../ui/MainBtn";
import TrashBtn from "../ui/TrashBtn";
import { COLORS } from "../../common/constants";
import ImageTaker from "./ImageTaker";
import { storePost } from "../../utils/http";

//TODO: verify both camera and location permissions at the beginning? here..,

export default function PostForm() {
	const navigation = useNavigation();
	const [title, setTitle] = useState("");
	const [place, setPlace] = useState("");
	const [location, setLocation] = useState(null);
	const [picture, setPicture] = useState(null);

	const [cameraIconDark, setCameraDark] = useState(true); //TODO:
	const [locationPermission, requestPermission] = useForegroundPermissions();

	function clearPost() {
		setPicture(null);
		setPlace("");
		setTitle("");
		setLocation(null);
	}

	function toTrashHandler() {
		clearPost();
	}

	async function verifyLocationPermissions() {
		if (locationPermission.status === PermissionStatus.GRANTED) {
			return true;
		}

		// PermissionStatus.UNDETERMINED ||	 PermissionStatus.DENIED
		const permissionResponse = await requestPermission();
		if (permissionResponse.granted) {
			return true;
		}

		Alert.alert(
			"Location use is not permitted!",
			"Pls grant location permissions to enjoy full functionality of the app."
		);
		return false;
	}

	async function publishHandler() {
		//FIXME: to enable Publish only after location is resolved
		const newPostReady = !!title && !!place && !!location && !!picture;
		if (!newPostReady) {
			Alert.alert(
				"New post not completed!",
				" Pls take picture and fill in required fields, then press Publish, or discard the post"
			);
			return;
		}

		const newPost = { title, place, location, picture, comments: [] };

    console.info("Publish>>post", newPostReady, newPost);

    storePost(newPost); //TODO: upload
		clearPost();
		navigation.navigate("Home");
	}

	async function takePictureHandler(uri) {
		setPicture(uri);
		const hasPermission = await verifyLocationPermissions();

		if (!hasPermission) {
			setLocation({ lat: 999, lng: 999 }); //location denied TODO:
		} else {
			const location = await getCurrentPositionAsync();
			setLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		}
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
						<MainBtn title={"Опубліковати"} onPress={publishHandler} />
					</View>
				</View>
				<TrashBtn style={styles.positionTrash} onPress={toTrashHandler} />
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
