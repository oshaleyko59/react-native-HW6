import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";

import SendBtn from "../../ui/SendBtn";
import { COLORS } from "../../../common/constants";
import useAuth from "../../../hooks/useAuth";
import { createComment } from "../../../utils/saveComment";
import handleError from "../../../helpers/handleError";

export default function CommentForm({postId}) {
	const [text, setText] = useState("");
  const { user } = useAuth();

  async function submitCommentHandler() {
    const content = text.trim();
    if (content === '') {
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
