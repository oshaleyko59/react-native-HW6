import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./Tabs/PostsScreen";
import ProfileScreen from "./Tabs/ProfileScreen";
import CreatePostScreen from "./Tabs/CreatePostScreen";

import LogoutBtn from "../../components/ui/LogoutBtn";
import BackBtn from "../../components/ui/BackBtn";
import { COLORS } from "../../common/constants";
import useAuth from "../../hooks/useAuthentication";

const BottomTab = createBottomTabNavigator();

const Grid = (color) => <Feather name="grid" size={24} color={color} />;
const User = () => <Feather name="user" size={24} color={COLORS.icon} />;
const New = () => (
	<View style={styles.newBtn}>
		<Feather name="plus" size={24} color={COLORS.secondaryText} />
	</View>
);

/* FIXME: header style

background: #FFF;
box-shadow: 0px 0.5px 0px 0px rgba(0, 0, 0, 0.30);
backdrop-filter: blur(13.591408729553223px);
*/
export default function HomeScreen({ navigation }) {
  const { onLogout } = useAuth();

  const onPressLogout = () => {
		console.debug("onPressLogout>>", onLogout);
		onLogout();
  }

	return (
		<BottomTab.Navigator
			initialRouteName="Posts"
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: styles.header,
				headerTitleStyle: styles.headerTitle,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBar,
				headerTitleStyle: styles.headerTitle,
			}}
		>
			<BottomTab.Screen
				name="Posts"
				component={PostsScreen}
				options={{
					title: "Публікації",
					tabBarIcon: ({ focused, size, color }) => <Grid />,
					headerRight: () => (
						<View style={{ marginRight: 16 }}>
							<LogoutBtn onPress={onPressLogout} />
						</View>
					),
				}}
			/>
			<BottomTab.Screen
				name="CreatePosts"
				component={CreatePostScreen}
				options={{
					title: "Створити публікацію",
					tabBarIcon: ({ focused, size, color }) => <New />,
					headerLeft: () => (
						<View style={{ marginLeft: 16 }}>
							<BackBtn onPress={() => navigation.navigate("Posts")} />
						</View>
					),
					tabBarStyle: { display: "none" },
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused, size, color }) => <User />,
					headerShown: false,
				}}
			/>
		</BottomTab.Navigator>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 88,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.inactive,
	},
	headerTitle: {
		//FIXME: for Android bottomPadding is incorrecy
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
		fontSize: 17,
		lineHeight: 22,
	},
	tabBar: {
		justifyContent: "center",
		alignItems: "center",
		height: 83,
		borderTopWidth: 1,
		borderTopColor: COLORS.inactive,
	},
	newBtn: {
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.accent,
		width: 70,
		height: 40,
		borderRadius: 20,
	},
});
