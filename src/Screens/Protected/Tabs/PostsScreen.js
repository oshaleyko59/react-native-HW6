import { View, StyleSheet } from "react-native";
import { ref,  } from "firebase/database";

import { db } from "../../../firebase/config";
import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/Posts/PostsList";
import { COLORS } from "../../../common/constants";

export default function PostsScreen() {
	const stripRef = ref(db, "strip");

	return (
		<View style={styles.container}>
			<View>
				<UserCard />
			</View>
			<PostsList listRef={stripRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		flex: 1,
		backgroundColor: COLORS.mainBkg,
	},
});
