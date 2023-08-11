import { StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../common/constants";
import IconButton from "../ui/IconButton";

export default function PostCard({ id,
	title,
	place,
	location,
	pictureUri,
	comments,
}) {
  const navigation = useNavigation();
//
	function commentsPressHandler() {
	//	co nsole.log("Comments pressed!>>comments", comments);
		navigation.navigate("Comments", { pictureUri, comments});
	}

	function locationPressHandler() {
   // cons ole.log("location pressed!>>", location);
    navigation.navigate("Map", { location, title });
	}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Image source={{uri:pictureUri}} style={styles.img} />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.titleStyle}>{title}</Text>
			</View>
			<View style={styles.btnsContainer}>
				<View style={styles.btnContainer}>
					<IconButton
						icon={"message-circle"}
						size={24}
						color={COLORS.inactive}
						onPress={commentsPressHandler}
					/>
					<Text
						style={[
							styles.commentsStyle,
							comments?.length && { color: COLORS.mainText },
						]}
					>
						{comments?.length}
					</Text>
				</View>
				<View style={styles.btnContainer}>
					<IconButton
						icon={"map-pin"}
						size={24}
						color={COLORS.inactive}
						onPress={locationPressHandler}
					/>
					<Text style={styles.placeStyle}>{place}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 299,
		flexShrink: 0,
		marginBottom: 32,
	},
	imgContainer: {
		width: "100%",
		height: 240,
		marginBottom: 8,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "lightblue", //TODO:
	},
	titleContainer: { marginBottom: 8 },
	btnsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	btnContainer: { flexDirection: "row", alignItems: "center" },

	img: { width: "100%", height: 240 },
	titleStyle: {
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
	},
	commentsStyle: {
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.inactive,
		fontFamily: "Roboto-Medium",
	},
	placeStyle: {
		marginLeft: 6,
		fontSize: 16,
		lineHeight: 19,
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
		textDecorationStyle: "solid",
		textDecorationLine: "underline",
	},
});
