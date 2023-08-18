import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
	View,
	StyleSheet,
	Alert,
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
	const [text, setText] = useState("");
	const { user } = useAuth();
	const [kbdStatus, setKbdStatus] = useState(false);
	console.log("CommentsScreen>>kbdStatus", kbdStatus);

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
			handleError("create comment error:", err);
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.flex}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<View>
            <Photo uri={post.picture} />
          </View>
					<CommentsList postId={postId} />
					{/* <View style={styles.inputContainer}>
              <StyledTextInput
                containerStyle={styles.styledInput}
                autoCapitalize="sentences"
                placeholder="Коментувати..."
                onChangeText={setText}
                setKbdStatus={setKbdStatus}
              />
              <SendBtn onPress={submitCommentHandler} />
            </View> */}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
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
	flex: {
		flex: 1,
	},
	container: {
		padding: 16,
		paddingTop: 28,
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},

	inputContainer: {
		//flex: 2,
		marginBottom: 16,
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
	styledInput: {
		borderRadius: 100,
		borderWidth: 0,
		marginBottom: 0,
	},
});
