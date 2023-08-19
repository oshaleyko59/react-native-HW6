import { View, Image, Text, StyleSheet } from "react-native";

import { COLORS } from "../common/constants";
import useAuth from "../hooks/useAuth";
import Loading from "./ui/Loading";

export default function UserCard() {
  const { user } = useAuth();

  if (!user) return <Loading msg="... loading user data" />;

	return (
		<View style={styles.container}>
			{user.photoURL ? (
				<Image source={{uri:user.photoURL}} alt="User avatar" style={styles.image} />
			) : (
				<View style={styles.image}>
					<Text style={styles.email}>No photo</Text>
				</View>
			)}
			<View style={styles.inner}>
				<Text style={styles.name}>{user.displayName}</Text>
				<Text style={styles.email}>{user.email}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 32,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 8,
	},

	image: {
		width: 60,
		height: 60,
		borderRadius: 16,
    backgroundColor: COLORS.inactiveBkg,
    justifyContent: 'center',
    alignItems:'center'
	},
	inner: {
		marginLeft: 8,
	},

	name: {
		fontFamily: "Roboto-Bold",
		fontSize: 13,
    lineHeight: 15,
    color: COLORS.mainText
	},
	email: {
		fontFamily: "Roboto-Regular",
		fontSize: 11,
    lineHeight: 13,
    color: COLORS.mainGrey
	},
});

