import { useFonts } from "expo-font";
import { Provider } from "react-redux";
//import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";

import Loading from "./src/components/ui/Loading";
import { store,  } from "./src/store/store"; //persistor
import Root from "./src/components/Root";

export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"), //for the future
	});

	if (!fontsLoaded) {
		return <Loading msg="Loading..." />;
  }

  console.info("\n\nAPP START>>"); //TODO: remove with last console stmt

  return   (
			<Provider store={store}>
					<Root />
			</Provider>
		);
}

/* 	return (
		<Provider store={store}>
			<PersistGate loading={<Loading msg="Loading..." />} persistor={persistor}>
				<Root />
			</PersistGate>
		</Provider>
	); */

