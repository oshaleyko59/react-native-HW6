import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import SendBtn from "../ui/SendBtn";
import Comment from "../../models/Comment";
import { COLORS } from "../../common/constants";
import useAuth from "../../hooks/useAuth";
import saveComment from "../../utils/saveComment";

export default function CommentForm({postId}) {
	const [text, setText] = useState("");
  const { user } = useAuth();
  console.info("CommentForm>>user", user.uid);

	function submitCommentHandler() {
    const newComment = new Comment(text, user.uid);
    saveComment(text, user.uid, postId);
    console.info("Submit>>comment", newComment);
    setText("");
	}

	return (
		<View style={styles.inputContainer}>
			<TextInput
				value={text}
				placeholder="Коментувати..."
				placeholderTextColor={COLORS.inactive}
				style={styles.input}
				onChangeText={(value) => setText(value)}
			/>
			<SendBtn onPress={submitCommentHandler} />
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.Gray01,
    paddingVertical: 8,
    paddingRight: 8,
    paddingLeft:16,
		marginBottom: 16,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: COLORS.Gray02,
	},
	input: {
		flex: 1,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		color: COLORS.mainText,
	},
});
