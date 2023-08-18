import { useState, useEffect } from "react";
import { StyleSheet, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";

import { db } from "../../../firebase/config";
import useAuth from "../../../hooks/useAuth";
import toggleLike from "../../../utils/toggleLike";
import Loading from "../../ui/Loading";
import Title from "./Title";
import Photo from "../Photo";
import OutlinedBtn from "../../ui/OutlinedBtn";
import { COLORS } from "../../../common/constants";

export default function PostCard({ postId }) {
  //console.info("PostCard>>", postId);

	const navigation = useNavigation();
	const { user } = useAuth();
	const [post, setPost] = useState();

	const postRef = ref(db, "/posts/" + postId);

	useEffect(() => {
		const unsubscribe = onValue(postRef, (snapshot) => {
			const data = snapshot.val();
			console.debug(
				"PostCard>>useEffect>>#comments",
				data.commentsCount,
				data.title
			);
			setPost(data);
    });
    return unsubscribe;
	}, [postId]);

  if (!post) {
    //console.log(">>empty post!!");
		return <Loading msg="Loading..." />;
	}

  function commentsPressHandler() {
    console.info("navigate>>Comments", post.title);
		navigation.navigate("Comments", { postId, post });
	}

  function locationPressHandler() {
    console.info("navigate>>Map");
		navigation.navigate("Map", post);
	}

	async function toggleLikePressHandler() {
    console.info("likes pressed>>");
    await  toggleLike(user.uid, postId);
  }

	return (
		<View style={styles.container}>
			<Photo uri={post.picture} />
			<Title title={post.title} />
			<View style={styles.btnsContainer}>
				<View style={styles.btnContainerLeft}>
					<OutlinedBtn
						icon={"message-circle"}
						onPress={commentsPressHandler}
					>
						{post.commentsCount}
					</OutlinedBtn>
					<OutlinedBtn
						icon={"thumbs-up"}
						onPress={toggleLikePressHandler}
					>
						{post.likesCount}
					</OutlinedBtn>
				</View>
				<OutlinedBtn
					icon={"map-pin"}
					onPress={locationPressHandler}
				>
					{post.place}
				</OutlinedBtn>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 299,
		flexShrink: 0,
		marginVertical: 12,
	},
	btnsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	btnContainerLeft: { flexDirection: "row", gap: 24 },
});
