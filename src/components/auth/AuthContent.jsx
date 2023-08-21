import {
	StyleSheet,
	View,
	ImageBackground,
	Keyboard,
	TouchableWithoutFeedback,
	Platform,
} from "react-native";

import AuthForm from "./AuthForm";
import KeyboardSpacer from "../KeyboardSpacer";
import { bkgImage } from "../../common/constants";

function AuthContent({ modeLogin, onAuthenticate }) {
	function submitHandler(credentials) {
		onAuthenticate(credentials);
	}
	//
	return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.flex}>
					<ImageBackground
						source={bkgImage}
						resizeMode="cover"
						style={styles.flex}
					>
						<AuthForm modeLogin={modeLogin} onSubmit={submitHandler} />
						{Platform.OS === "ios" && <KeyboardSpacer />}
					</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		justifyContent: "flex-end",
	},
});
