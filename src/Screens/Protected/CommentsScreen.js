import React from "react";
import { useRoute } from "@react-navigation/native";
import {
	View,
	StyleSheet,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import CommentsList from "../../components/Posts/Comments/CommentsList";
import CommentForm from "../../components/Posts/Comments/CommentForm";
import { COLORS } from "../../common/constants";
import Photo from "../../components/Posts/Photo";

export default function CommentsScreen() {
	const route = useRoute();
	const { post, postId } = route.params;
	console.log("CommentsScreen>>postId", post.title);
	//<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Photo uri={post.picture} />
				<CommentsList postId={postId} />
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={[
						styles.flex,
						Platform.OS === "ios" && { justifyContent: "flex-end" },
					]}
				>
					<CommentForm postId={postId} />
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
}
/*
<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={[
						styles.flex,
						Platform.OS === "ios" && { justifyContent: "flex-end" },
					]}
				>
         */
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
		backgroundColor: "lightblue",
	},
	img: { width: "100%", height: 240 },
});
