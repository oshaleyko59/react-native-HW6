import React, {useState} from "react";
import { useRoute } from "@react-navigation/native";
import {
	View,
	StyleSheet,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import useAuth from "../../hooks/useAuth";
import StyledTextInput from "../../components/StyledTextInput";
import CommentsList from "../../components/Posts/Comments/CommentsList";
import { COLORS } from "../../common/constants";
import Photo from "../../components/Posts/Photo";
import SendBtn from "../../components/ui/SendBtn";
import { createComment } from "../../utils/createComment";
import handleError from "../../helpers/handleError";

export default function CommentsScreen() {
	const route = useRoute();
	const { post, postId } = route.params;
  console.log("CommentsScreen>>postId", post.title);
  	const [text, setText] = useState("");
		const { user } = useAuth();
  const [kbdStatus, setKbdStatus] = useState(false);

   async function submitCommentHandler() {
			if (text?.trim() === "") {
				Alert.alert("", "Empty comments are not allowed");
				return;
			}
			try {
				const res = await createComment(text, postId, user.uid, user.photoURL);
				console.info("Submit>>comment", res);
				setText("");
			} catch (err) {
				handleError("createComment error:", err);
			}
  }

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Photo uri={post.picture} />
				<CommentsList postId={postId} />
				<View style={styles.inputContainer}>
					<StyledTextInput
						containerStyle={styles.styledInput}
						autoCapitalize="sentences"
						placeholder="Коментувати..."
						onEndEditing={setText}
						setKbdStatus={setKbdStatus}
					/>
					<SendBtn onPress={submitCommentHandler} />
				</View>
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
    marginTop: 12,
		paddingTop: 16,
		paddingHorizontal: 16,
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},

	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.Gray01,
		paddingRight: 8,
		marginBottom: 16,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: COLORS.Gray02,
		overflow: "hidden",
	},
	styledInput: {
		borderRadius: 100,
		borderWidth: 0,
		marginBottom: 0,
	},

});

