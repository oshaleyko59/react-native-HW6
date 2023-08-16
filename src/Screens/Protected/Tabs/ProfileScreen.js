import React, {useLayoutEffect, useState } from "react";
import { View, ImageBackground, Text, StyleSheet, Dimensions } from "react-native";
import { ref, onValue, onChildAdded } from "firebase/database";

import { db } from "../../../firebase/config";
import useAuth from "../../../hooks/useAuth";
import Avatar from "../../../components/Avatar";
import PostsList from "../../../components/Posts/PostsList";
import LogoutBtn from "../../../components/ui/LogoutBtn";
import { bkgImage, COLORS } from "../../../common/constants";

export default function ProfileScreen() {
  	console.debug("ProfileScreen>>");
	const [userPosts, setUserPosts] = useState([]);
	const { user, onLogout } = useAuth();
	const heightCalculated = Dimensions.get("screen").height - 390;

	const postsRef = ref(db, `users/${user.uid}/posts`);

	const loadUserPosts = ()=> onValue(
		postsRef,
    (snapshot) => {
			const posts = [];
			console.debug("ProfileScreen>>onvalue>>snapshot", snapshot);
			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const postId = {};
				postId[childKey] = true;
				posts.push(postId);
			});
			//console.debug("Once onvalue>>posts", posts);
			setUserPosts(posts);
		},
		{
			onlyOnce: true,
		}
	);

/*   onChildAdded(postsRef, (data) => {
  //  const post = data.val();
    const key = data.key;
    console.debug("ProfileScreen>>onChildAdded", key);
    setUserPosts((posts) => [key, ...posts]);
	}); */
	/*
	useLayoutEffect(() => {
		console.log(
			"useLayoutEffect>>user.uid ",
			user.uid,
			heightCalculated,Dimensions.get("screen").height
		);
		(async () => {
			try {
				await getUserPosts(user.uid, setUserPosts);
				console.log("useLayoutEffect>>userPosts ", userPosts.length);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []); */
useLayoutEffect(() => {
	try {
		loadUserPosts();
		console.log("useLayoutEffect>>posts ", userPosts.length);
	} catch (err) {
		console.error(err);
	}
}, []);
/*
  return (
		<View style={styles.container}>
			<Text>
				TODO:
			</Text>
		</View>
	);
 */
	return (
		<View style={styles.flex}>
			<ImageBackground source={bkgImage} resizeMode="cover" style={styles.flex}>
				<View style={styles.formContainer}>
					<View style={styles.logOutButton}>
						<LogoutBtn onPress={onLogout} />
					</View>
					<Avatar modeAdd={false} url={user.photoURL} />
					<View style={{ marginTop: 92 }}>
						<Text style={styles.header}>{user.displayName}</Text>
					</View>

					<View
						style={{
							height: heightCalculated,
							justifyContent: "center",
						}}
					>
						<PostsList posts={userPosts} />
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		justifyContent: "flex-end",
	},

  formContainer: {
    marginTop:147,
		backgroundColor: COLORS.mainBkg,
		paddingHorizontal: 16,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
	},

	header: {
		marginBottom: 33,
		fontSize: 30,
		lineHeight: 35,
		letterSpacing: 0.3,
		textAlign: "center",
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
	},
	logOutButton: {
		position: "absolute",
		right: 8,
		top: 14,
	},
});
