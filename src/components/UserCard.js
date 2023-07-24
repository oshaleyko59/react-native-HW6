import { View, Image, Text, StyleSheet } from "react-native";
import { COLORS } from "../common/constants";

export default function UserCard({ user }) {

	return (
		<View style={styles.container}>
			{user.image ? (
				<Image source={user.image} alt="User photo" style={styles.image} />
			) : (
				<View style={styles.image}>
					<Text style={styles.email}>No photo</Text>
				</View>
			)}
			<View style={styles.inner}>
				<Text style={styles.name}>{user.name}</Text>
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

