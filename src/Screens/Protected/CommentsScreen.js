import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
	View,
	SafeAreaView,
	TextInput,
	StyleSheet,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
//FIXME: import KeyboardSpacer from "react-native-keyboard-spacer";

import useAuth from "../../hooks/useAuth";
import CommentsList from "../../components/Posts/Comments/CommentsList";
import { COLORS } from "../../common/constants";
import Photo from "../../components/Posts/Photo";
import SendBtn from "../../components/ui/SendBtn";
import { createComment } from "../../utils/createComment";
import handleError from "../../helpers/handleError";

export default function CommentsScreen() {
	const route = useRoute();
	const { post, postId } = route.params;
	const [text, setText] = useState("");
	const { user } = useAuth();
	const [kbdStatus, setKbdStatus] = useState(false);
	const [editing, setEditing] = useState(false);
	console.log("CommentsScreen>>kbdStatus", kbdStatus, text);

	async function submitCommentHandler() {
		const comment = text?.trim();

		if (!comment) {
			Alert.alert("", "Empty comments are not allowed");
			return;
		}

		try {
			await createComment(comment, postId, user.uid, user.photoURL);
			setText("");
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
							setKbdStatus(true);
						}}
						onBlur={() => {
							setEditing(false);
							setKbdStatus(false);
						}}
						style={styles.input}
					/>
					<SendBtn onPress={submitCommentHandler} />
				</View>
				{/* <KeyboardSpacer /> */}
			</View>
		</SafeAreaView>
	);
}
//{Platform.OS === "ios" && }
const styles = StyleSheet.create({
	inner: {
		flex: 1,
	//	justifyContent: "flex-end",
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
		backgroundColor: COLORS.Gray01,
	},
});

/* 	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
								autoCapitalize="sentences"
								placeholder="Коментувати..."
								value={text}
								onChangeText={setText}
								onFocus={() => {
									setEditing(true);
									setKbdStatus(true);
								}}
								onBlur={() => {
									setEditing(false);
									setKbdStatus(false);
								}}
								style={styles.input}
							/>
							<SendBtn onPress={submitCommentHandler} />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
	); */

/*
<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={[
						{flex: 1},
						Platform.OS === "ios" && { justifyContent: "flex-end" },
					]}
				>
  */
