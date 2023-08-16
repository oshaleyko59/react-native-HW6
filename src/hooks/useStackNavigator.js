import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import { auth } from "../firebase/config";
import useAuth from "./useAuth";
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegistrationScreen from "../Screens/Auth/RegistrationScreen";
import HomeScreen from "../Screens/Protected/HomeScreen";
import MapScreen from "../Screens/Protected/MapScreen";
import CommentsScreen from "../Screens/Protected/CommentsScreen";
import LogoutBtn from "../components/ui/LogoutBtn";
import BackBtn from "../components/ui/BackBtn";
import Loading from "../components/ui/Loading";
import { COLORS } from "../common/constants";

const MainStack = createStackNavigator();

function AuthStack() {
	return (
		<MainStack.Navigator screenOptions={{ headerShown: false }}>
			<MainStack.Screen name="Login" component={LoginScreen} />
			<MainStack.Screen name="Signup" component={RegistrationScreen} />
		</MainStack.Navigator>
	);
}

function ProtectedStack() {
	const navigation = useNavigation();
	const { onLogout } = useAuth(); //isAuthenticated, user,

	return (
		<MainStack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: styles.header,
				headerTitleStyle: styles.headerTitle,
			}}
		>
			<MainStack.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerShown: false,
					headerRight: () => (
						<View style={{ marginRight: 16 }}>
							<LogoutBtn onPress={onLogout} />
						</View>
					),
				}}
			/>
			<MainStack.Screen
				name="Map"
				component={MapScreen}
				options={{
					title: "Карта",
					headerLeft: () => (
						<View style={{ marginLeft: 16 }}>
							<BackBtn onPress={() => navigation.navigate("Home")} />
						</View>
					),
				}}
			/>
			<MainStack.Screen
				name="Comments"
				component={CommentsScreen}
				options={{
					title: "Коментарі",
					headerLeft: () => (
						<View style={{ marginLeft: 16 }}>
							<BackBtn onPress={() => navigation.navigate("Home")} />
						</View>
					),
				}}
			/>
		</MainStack.Navigator>
	);
}

export function useStackNavigator() {
  function getStackNavigator() {
		const { onLogout, isAuthenticated, setAuthed } = useAuth();
		useEffect(() => {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// User is signed in, see docs for a list of available properties
					// https://firebase.google.com/docs/reference/js/auth.user
					const uid = user.uid;
					console.debug("onAuthStateChanged>>uid", auth.currentUser?.email);
          setAuthed(true);
				} else {
					// User is signed out
					console.debug("onAuthStateChanged>>no user");
				  setAuthed(false);
				}
			});
		}, []);

		console.info("getStackNavigator>>isAuthenticated", isAuthenticated);
		return isAuthenticated === null ? (
			<Loading msg="Checking authentication status..." />
		) :
    isAuthenticated ? (
			<ProtectedStack onLogout={onLogout} />
		) : (
			<AuthStack />
		);
	}

	return { getStackNavigator };
}

const styles = StyleSheet.create({
	header: {
		height: 88,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.inactive,
	},
	headerTitle: {
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
		fontSize: 17,
	},
});
