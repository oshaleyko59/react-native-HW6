import {
	View,
	ImageBackground,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native";
import { ref, } from "firebase/database";

import { db } from "../../../firebase/config";
import useAuth from "../../../hooks/useAuth";
import Avatar from "../../../components/Avatar";
import PostsList from "../../../components/Posts/PostsList";
import LogoutBtn from "../../../components/ui/LogoutBtn";
import { bkgImage, COLORS } from "../../../common/constants";

export default function ProfileScreen() {
	const { user, onLogout } = useAuth();
	const heightCalculated = Dimensions.get("screen").height - 390;

	const postsRef = ref(db, `users/${user.uid}/posts`);

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
						<PostsList listRef={postsRef} />
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
		marginTop: 147,
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
