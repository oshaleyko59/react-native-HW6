import {
	StyleSheet,
	View,
	ImageBackground,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
  Keyboard,
  Platform //081923
} from "react-native";

import AuthForm from "./AuthForm";

import { bkgImage } from "../../common/constants";

function AuthContent({ modeLogin, onAuthenticate }) {
	function submitHandler(credentials) {
		onAuthenticate(credentials);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.flex}>
				<ImageBackground
					source={bkgImage}
					resizeMode="cover"
					style={styles.flex}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={[
              styles.flex,
              (Platform.OS === "ios") &&  {justifyContent: "flex-end"},
						]}
					>
						<AuthForm modeLogin={modeLogin} onSubmit={submitHandler} />
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default AuthContent;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
});


