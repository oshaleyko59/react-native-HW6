import { useState, useMemo } from "react";
import {
  StyleSheet, View, Dimensions, Text,
  Platform //081923
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../../hooks/useAuth";
import AuthButtons from "./authButtons";
import PasswordInput from "./PasswordInput";
import StyledTextInput from "../StyledTextInput";
import Avatar from "../Avatar";
import { COLORS } from "../../common/constants";

function AuthForm({ modeLogin, onSubmit }) {
	const { user } = useAuth();
	const [kbdStatus, setKbdStatus] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState(modeLogin ? user?.email : "");
	const [password, setPassword] = useState("");

	const height = useMemo(() => (modeLogin ? 489 : 549), [modeLogin]);
	const paddTop = useMemo(() => (modeLogin ? 32 : 92), [modeLogin]);
	const marginTopCalculated = useMemo(
		() => Dimensions.get("screen").height - height,
		[height]
	);

	const formIsReady =
		email?.trim().length > 5 &&
		password?.trim().length >= 6 && (modeLogin || name?.trim().length > 0);

	function submitHandler() {
		if (!formIsReady) {
			return;
		}
		const inputTrimmed = {};
		inputTrimmed.email = email.trim().toLowerCase();
		inputTrimmed.password = password.trim();
		if (modeLogin) {
			inputTrimmed.name = name.trim();
		}
		onSubmit(inputTrimmed);
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
			{!modeLogin && <Avatar modeAdd={true} email={formIsReady && email} />}
			<Text style={styles.header}>{modeLogin ? "Увійти" : "Реєстрація"}</Text>
			{!modeLogin && (
				<StyledTextInput
					autoComplete="name"
					autoCapitalize="words"
					placeholder="Логін"
					onChangeText={setName}
					setKbdStatus={setKbdStatus}
				/>
			)}
			<StyledTextInput
				value={modeLogin ? (user ? user.email : "") : ""}
				autoComplete="email"
				autoCapitalize="none"
				keyboardType="email-address"
				placeholder="Адреса електронної пошти"
				onChangeText={setEmail}
				setKbdStatus={setKbdStatus}
			/>
			<PasswordInput onChangeText={setPassword} setKbdStatus={setKbdStatus} />
			{!kbdStatus && (
				<AuthButtons
					active={formIsReady}
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

/*
			{/* 			<EmailInput
				value={modeLogin ? (user ? user.email : "") : ""}
				onEndEditing={(value) => setEmail(value.toLowerCase())}
				setKbdStatus={setKbdStatus}
			/>  */
