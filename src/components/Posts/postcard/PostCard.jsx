import { useState, useEffect } from "react";
import { StyleSheet, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";

import { db } from "../../../firebase/config";
import useAuth from "../../../hooks/useAuth";
import toggleLike from "../../../utils/toggleLike";
import Loading from "../../ui/Loading";
import Title from "./Title";
import Photo from "./Photo";
import CommentsNumber from "./CommentsNumber";
import LikesNumber from "./LikesNumber";
import Place from "./Place";

export default function PostCard({ postId }) {
  console.info("PostCard>>", postId);

	const navigation = useNavigation();
	const { user } = useAuth();
	const [post, setPost] = useState();

	const postRef = ref(db, "/posts/" + postId);

	useEffect(() => {
		const unsubscribe = onValue(postRef, (snapshot) => {
			const data = snapshot.val();
			console.debug(
				"PostCard>>useEffect>>onValue",
				postId,
				data.likesCount,
				data.title
			);
			setPost(data);
    });
    return unsubscribe;
	}, [postId]);

  if (!post) {
    console.log("ERROR>>empty post!!");
		return <Loading msg="Loading..." />;
	}

  function commentsPressHandler() {
    console.log("navigate>>Comments");
		navigation.navigate("Comments", post);
	}

  function locationPressHandler() {
    console.log("navigate>>Map");
		navigation.navigate("Map", post);//{ location, title }
	}

	function toggleLikePressHandler() {
		console.log("likes pressed>>");
		toggleLike(user.uid, postId);
  }

console.log("post>>", post.likesCount);
	return (
		<View style={styles.container}>
			<Photo uri={post.picture} />
			<Title title={post.title} />
			<View style={styles.btnsContainer}>
				<View style={styles.btnContainerLeft}>
					<CommentsNumber
						commentsCount={post.commentsCount}
						onPress={commentsPressHandler}
					/>
					<LikesNumber
						likesCount={post.likesCount}
						onPress={toggleLikePressHandler}
					/>
				</View>
				<Place text={post.place} onPress={locationPressHandler} />
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
	btnsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	btnContainerLeft: { flexDirection: "row", gap: 24 },
});
