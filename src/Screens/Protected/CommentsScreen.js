import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, Image } from "react-native";
import CommentsList from "../../components/Comments/CommentsList";
import CommentForm from "../../components/Comments/CommentForm";
import { COLORS } from "../../common/constants";

export default function CommentsScreen() {
	const route = useRoute();
	const { picture, comments, id } = route.params;
	console.log("CommentsScreen>>postId", id, comments?.length);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.imgContainer}>
					<Image source={{uri:picture}} style={styles.img} />
				</View>
				<CommentsList comments={comments} />
				<CommentForm postId={id} />
			</View>
		</>
	);
}

//TODO: KeyboardAvoidingView ???
const styles = StyleSheet.create({
	container: {
		paddingTop: 32,
		paddingHorizontal: 16,
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},
	imgContainer: {
		width: "100%",
		height: 240,
		marginBottom: 32,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "lightblue", //TODO:
	},
	img: { width: "100%", height: 240 },
});
