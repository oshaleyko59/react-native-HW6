import { useState, useMemo } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AuthButtons from "./authButtons";
import PasswordInput from "./PasswordInput";
import EmailInput from "../../components/auth/EmailInput";
import StyledTextInput from "../../components/auth/StyledTextInput";
import Avatar from "../Avatar";
import { COLORS } from "../../common/constants";

function AuthForm({ modeLogin, onSubmit }) {
	const [kbdStatus, setKbdStatus] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const height = useMemo(() => (modeLogin ? 489 : 549), [modeLogin]);
	const paddTop = useMemo(() => (modeLogin ? 32 : 92), [modeLogin]);
	const marginTopCalculated = useMemo(
		() => Dimensions.get("screen").height - height,
		[height]
	);

  function submitHandler() {
    onSubmit({
			name,
			email,
			password,
    });
  }

	const navigation = useNavigation();

	function onAlternativePress() {
		if (modeLogin) {
			navigation.replace("Signup");
		} else {
			navigation.replace("Login");
		}
	}

	return (
		<View
			style={[
				styles.formContainer,
				Platform.OS === "ios"
					? { paddingTop: paddTop }
					: {
							marginTop: marginTopCalculated,
							height: height,
							paddingTop: paddTop,
					},
			]}
		>
      {!modeLogin && <Avatar modeAdd={ true} />}
			<Text style={styles.header}>{modeLogin ? "Увійти" : "Реєстрація"}</Text>
			{!modeLogin && (
				<StyledTextInput
					autoComplete="name"
					autoCapitalize="words"
					placeholder="Логін"
					onEndEditing={(value) => setName(value)}
					setKbdStatus={setKbdStatus}
				/>
			)}
			<EmailInput
				onEndEditing={(value) => setEmail(value)}
				setKbdStatus={setKbdStatus}
			/>
			<PasswordInput
				onEndEditing={(value) => setPassword(value)}
				setKbdStatus={setKbdStatus}
			/>
			{!kbdStatus && (
				<AuthButtons
					modeIsLogin={modeLogin}
					onSubmit={submitHandler}
					onMove={onAlternativePress}
				/>
			)}
		</View>
	);
}

export default AuthForm;

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: COLORS.mainBkg,
		paddingHorizontal: 16,
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
	},
	header: {
		marginBottom: 32,
		fontSize: 30,
		lineHeight: 35,
		letterSpacing: 0.3,
		textAlign: "center",
		color: COLORS.mainText,
		fontFamily: "Roboto-Medium",
	},
});
