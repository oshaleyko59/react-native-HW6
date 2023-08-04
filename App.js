import { useFonts } from "expo-font";
import { Provider, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "./src/firebase/config";

import { useStackNavigator } from "./src/hooks/useStackNavigator";
//import useAuth from "./src/hooks/useAuth";
import useAuth from "./src/hooks/useAuthentication";
import Loading from "./src/components/ui/Loading";
import { store, persistor } from "./src/store/store";

function Root() {
	const { isAuthenticated, refreshUser } = useAuth();
	const { getStackNavigator } = useStackNavigator();

	const user = auth.currentUser;
  console.debug("auth.currentUser>>", user);


	useLayoutEffect(() => {
    if (isAuthenticated) {

			refreshUser();
		}
	}, []);

	return (
		<NavigationContainer>
			{getStackNavigator(isAuthenticated)}
		</NavigationContainer>
	);
}

export default function App() {

	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"), //for the future
	});

	if (!fontsLoaded) {
		return <Loading msg="Loading..." />;
	}
console.info("APP START>>");
	return (
		<Provider store={store}>
			<PersistGate loading={<Loading msg="Loading..." />} persistor={persistor}>
				<Root />
			</PersistGate>
		</Provider>
	);
}
