import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";

import { db } from "../../firebase/config";
import { COLORS } from "../../common/constants";
import IconButton from "../ui/IconButton";
import useAuth from "../../hooks/useAuth";
import toggleLike from "../../utils/toggleLike";
import Loading from "../ui/Loading";

export default function PostCard({ postId }) {
  console.info("PostCard>>", postId);

	const navigation = useNavigation();
	const { user } = useAuth();
	const [post, setPost] = useState();

	const postRef = ref(db, "/posts/" + postId);

	useEffect(() => {
		onValue(postRef, (snapshot) => {
			const data = snapshot.val();
			console.debug(
				"PostCard>>useEffect>>onValue",
				postId,
				data.likesCount,
				data.title
			);
			setPost(data);
		});
	}, [postId]);

  if (!post) {
    console.log("ERROR>>empty post!!");
		return <Loading msg="Loading..." />;
	}

	function commentsPressHandler() {
		navigation.navigate("Comments", post);
	}

	function locationPressHandler() {
		navigation.navigate("Map", { location, title });
	}

	function toggleLikePressHandler() {
		console.log("likes pressed>>");
		toggleLike(user.uid, id);
	}

	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<Image source={{ uri: post.picture }} style={styles.img} />
			</View>
			<View style={styles.titleContainer}>
				<Text style={styles.titleStyle}>{post.title}</Text>
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
									post.commentsCount === 0 && { color: COLORS.mainText },
								]}
							>
								{post.commentsCount}
							</Text>
						</View>
						<View style={styles.btnContainer}>
							<IconButton
								icon={"thumbs-up"}
								size={20}
								color={COLORS.inactive}
								onPress={toggleLikePressHandler}
							/>
							<Text
								style={[
									styles.commentsStyle,
									post.likesCount === 0 && { color: COLORS.mainText },
								]}
							>
								{post.likesCount}
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
					<Text style={styles.placeStyle}>{post.place}</Text>
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
		backgroundColor: "lightblue",
	},
	titleContainer: { marginBottom: 8 },
	btnsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	btnContainer: { flexDirection: "row", gap: 6 },
	btnContainerLeft: { flexDirection: "row", gap: 24 },
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
