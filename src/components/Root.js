import { NavigationContainer } from "@react-navigation/native";

import { auth } from "../firebase/config";
import { useStackNavigator } from "../hooks/useStackNavigator";
import useAuth from "../hooks/useAuthentication";

export default function Root() {
	const { isAuthenticated } = useAuth();
	const { getStackNavigator } = useStackNavigator();
	const currentUser = auth.currentUser;
	console.debug(
		"auth.currentUser>>",
		isAuthenticated,
		currentUser?.email,
		currentUser?.displayName
	);

	return (
		<NavigationContainer>
			{getStackNavigator(isAuthenticated)}
		</NavigationContainer>
	);
}

/*
//import { useLayoutEffect } from "react";
//import { onAuthStateChanged } from "firebase/auth";
	useLayoutEffect(() => {
		if (isAuthenticated) {
			//FIXME:
			onAuthStateChanged(auth, (user) => {
				console.log("useLayoutEffect>>user", user?.email, user?.displayName);
			});
		}
	}, []);
 */
