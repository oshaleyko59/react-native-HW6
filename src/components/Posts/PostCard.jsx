import { StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../common/constants";
import IconButton from "../ui/IconButton";

export default function PostCard(post) {
	const navigation = useNavigation();
	const{
	id,
	title,
	place,
	location,
	picture,
	comments,
	commentsCount,
	likesCount,
} = post;
	function commentsPressHandler() {
		navigation.navigate("Comments", post);
	}

	function locationPressHandler() {
		navigation.navigate("Map", { location, title });
	}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Image source={{ uri: picture }} style={styles.img} />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.titleStyle}>{title}</Text>
			</View>
			<View style={styles.btnsContainer}>
				<View style={styles.btnContainer}>
					<View style={styles.btnContainerLeft}>
						<View style={styles.btnContainer}>
							<IconButton
								icon={"message-circle"}
								size={20}
								color={COLORS.inactive}
								onPress={commentsPressHandler}
							/>
							<Text
								style={[
									styles.commentsStyle,
									commentsCount === 0 && { color: COLORS.mainText },
								]}
							>
								{commentsCount}
							</Text>
						</View>
						<View style={styles.btnContainer}>
							<IconButton
								icon={"thumbs-up"}
								size={20}
								color={COLORS.inactive}
								onPress={()=>console.log("likes pressed>>TODO")}
							/>
							<Text
								style={[
									styles.commentsStyle,
									likesCount === 0 && { color: COLORS.mainText },
								]}
							>
								{likesCount}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.btnContainer}>
					<IconButton
						icon={"map-pin"}
						size={20}
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
	btnContainer: { flexDirection: "row",  gap: 6 },
	btnContainerLeft: { flexDirection: "row",  gap: 24 },
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
