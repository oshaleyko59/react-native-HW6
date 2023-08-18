import { StyleSheet, View, Image } from "react-native";

export default function Photo({ uri }) {
	return (
		<View style={styles.imgContainer}>
			<Image source={{ uri }} style={styles.img} />
		</View>
	);
}

const styles = StyleSheet.create({
	imgContainer: {
		width: "100%",
		height: 240,
		marginVertical: 4,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: "lightblue",
	},
	img: { width: "100%", height: 240 },
});
