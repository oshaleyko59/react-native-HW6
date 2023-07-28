import { useState, useLayoutEffect } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useStackNavigator } from "./src/hooks/useStackNavigator";

//import AuthContextProvider, { useAuthContext } from "./src/store/auth-context";
import Loading from "./src/components/ui/Loading";
import { store } from "./src/store/store";

function Root() {
	//const { authenticate } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);
	const { getStackNavigator } = useStackNavigator();

	useLayoutEffect(() => {
		async function fetchUser() {
			try {
				const storedUser = await AsyncStorage.getItem("user");

				if (!storedUser) {
					return null;
				}
				const user = JSON.parse(storedUser);
				//FIXME: authenticate(user);
			} catch (e) {
				console.error("fetchUser>> ERROR", e.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchUser();
	}, []);

	return (
		<NavigationContainer>{getStackNavigator(isLoading)}</NavigationContainer>
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

	//<AuthContextProvider></AuthContextProvider>

	return (
		<Provider store={store}>
			<Root />
		</Provider>
	);
}
