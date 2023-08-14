import React, { useLayoutEffect, useState } from "react";
import { View, ImageBackground, Text, StyleSheet, Dimensions } from "react-native";

import useAuth from "../../../hooks/useAuthentication";
import Avatar from "../../../components/Avatar";
import PostsList from "../../../components/Posts/PostsList";
import LogoutBtn from "../../../components/ui/LogoutBtn";
import { bkgImage, COLORS } from "../../../common/constants";
import getUserPosts from "../../../utils/getUserPosts";

export default function ProfileScreen() {
	const [userPosts, setUserPosts] = useState([]);
	const { user, onLogout } = useAuth();
	const heightCalculated = Dimensions.get("screen").height -390;
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
	}, []);

	const onPressLogout = () => {
		//console.debug("onPressLogout>>", onLogout);
		onLogout();
	};

	return (
		<View style={styles.flex}>
			<ImageBackground source={bkgImage} resizeMode="cover" style={styles.flex}>
				<View style={styles.formContainer}>
					<View style={styles.logOutButton}>
						<LogoutBtn onPress={onPressLogout} />
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
