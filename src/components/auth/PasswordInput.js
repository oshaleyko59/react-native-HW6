import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import StyledTextInput from "../StyledTextInput";
import { COLORS } from "../../common/constants";

//button to show/hide password
function ShowHideBtn({ title, onPress }) {
  //TODO: outer container???
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ foreground: true, color: COLORS.accent }}
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.btnTitle}>{title}</Text>
    </Pressable>
  );
}

export default function PasswordInput({ onChangeText, setKbdStatus }) {
	const [isPasswordVisible, setPasswordVisible] = useState(false);

	return (
		<View>
			<StyledTextInput
				autoComplete="current-password"
				autoCapitalize="none"
				placeholder="Пароль"
				onChangeText={onChangeText}
				secureTextEntry={!isPasswordVisible}
				setKbdStatus={setKbdStatus}
			/>
			<ShowHideBtn
				title={isPasswordVisible ? "Сховати" : "Показати"}
				onPress={() => {
					setPasswordVisible(!isPasswordVisible);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	btn: {
		alignSelf: "flex-end",
		top: -50,
		right: 16,
	},

	pressed: {
		opacity: 0.5,
	},
	btnTitle: {
		color: COLORS.linkText,
		fontSize: 16,
		lineHeight: 19,
		fontFamily: "Roboto-Regular",
	},
});
