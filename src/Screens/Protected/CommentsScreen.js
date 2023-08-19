import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	Alert,
	Keyboard, Platform
} from "react-native";

import useAuth from "../../hooks/useAuth";
import CommentsList from "../../components/Posts/Comments/CommentsList";
import { COLORS } from "../../common/constants";
import Photo from "../../components/Posts/Photo";
import SendBtn from "../../components/ui/SendBtn";
import { createComment } from "../../utils/createComment";
import handleError from "../../helpers/handleError";
import KeyboardSpacer from "../../components/KeyboardSpacer";

export default function CommentsScreen() {
	const route = useRoute();
	const { post, postId } = route.params;
	const [text, setText] = useState("");
	const { user } = useAuth();
	const [editing, setEditing] = useState(false);

	async function submitCommentHandler() {
		const comment = text?.trim();

		if (!comment) {
			Alert.alert("", "Empty comments are not allowed");
			return;
		}

		try {
			await createComment(comment, postId, user.uid, user.photoURL);
      setText("");
      Keyboard.dismiss();
		} catch (err) {
			handleError("create comment error:", err);
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.inner}>
				<Photo uri={post.picture} />
				<CommentsList postId={postId} />
				<View
					style={[
						styles.inputContainer,
						editing && { borderColor: COLORS.accent },
					]}
				>
					<TextInput
						multiline
						maxLength={300}
						inputMode="text"
						autoCapitalize="sentences"
						placeholder="Коментувати..."
						value={text}
						onChangeText={setText}
						onFocus={() => {
							setEditing(true);
						}}
						onBlur={() => {
							setEditing(false);
						}}
						style={styles.input}
					/>
					<SendBtn onPress={submitCommentHandler} />
        </View>
        {(Platform.OS === "ios") && <KeyboardSpacer />}
			</View>
		</SafeAreaView>
	);
}
//{Platform.OS === "ios" && }
const styles = StyleSheet.create({
	inner: {
		flex: 1,
		backgroundColor: COLORS.mainBkg,
		padding: 16,
		paddingTop: 28,
	},

	inputContainer: {
		height: 50,
		padding: 16,
    marginTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: COLORS.Gray01,
		paddingRight: 8,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: COLORS.Gray02,
		overflow: "hidden",
	},
	input: {
		width: "85%",
		alignSelf: "center",
		backgroundColor: COLORS.Gray01,
		paddingTop: 0,
	},
});

