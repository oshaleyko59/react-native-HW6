import { useState, useMemo } from "react";
import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuthentication";
import AuthButtons from "./authButtons";
import PasswordInput from "./PasswordInput";
import EmailInput from "../../components/auth/EmailInput";
import StyledTextInput from "../../components/auth/StyledTextInput";
import Avatar from "../Avatar";
import { COLORS } from "../../common/constants";

function AuthForm({ modeLogin, onSubmit }) {
	const { user } = useAuth();
	const [kbdStatus, setKbdStatus] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState(modeLogin && user?.email);
	const [password, setPassword] = useState("");

	const height = useMemo(() => (modeLogin ? 489 : 549), [modeLogin]);
	const paddTop = useMemo(() => (modeLogin ? 32 : 92), [modeLogin]);
	const marginTopCalculated = useMemo(
		() => Dimensions.get("screen").height - height,
		[height]
	);

	function submitHandler() {
		if (
			email.length === 0 ||
			password.length < 6 ||
			(!modeLogin && name.length === 0)
		) {
			Alert.alert(
				"Please fill in every field and check password (it must be longer than 6 symbols"
			);
			return;
		}

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
			{!modeLogin && (
				<Avatar modeAdd={true} email={email.length > 5 ? email : false} />
			)}
			<Text style={styles.header}>{modeLogin ? "Увійти" : "Реєстрація"}</Text>
			{!modeLogin && (
				<StyledTextInput
					autoComplete="name"
					autoCapitalize="words"
					placeholder="Логін"
					onEndEditing={(value) => setName(value.trim())}
					setKbdStatus={setKbdStatus}
				/>
			)}
			<EmailInput
				value={modeLogin? user? user.email : '' :''}
				onEndEditing={(value) => setEmail(value.trim().toLowerCase())}
				setKbdStatus={setKbdStatus}
			/>
			<PasswordInput
				onEndEditing={(value) => setPassword(value.trim())}
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
