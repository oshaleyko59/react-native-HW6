import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../common/constants";

export default function StyledTextInput({
  initValue,
  onChangeText,
	//onEndEditing,
	secureTextEntry,
	placeholder,
	keyboardType,
	autoCapitalize,
	autoComplete,
	setKbdStatus,
	containerStyle,
}) {
	const [editing, setEditing] = useState(false);
	//const [text, setText] = useState(initValue);

	return (
		<View
			style={[
				styles.container,
				containerStyle,
				editing && { borderColor: COLORS.accent },
			]}
		>
			<TextInput
				style={styles.input}
				autoComplete={autoComplete}
				autoCapitalize={autoCapitalize}
				autoCorrect={false}
				keyboardType={keyboardType}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				value={initValue}
				onChangeText={onChangeText}
				onFocus={() => {
					setEditing(true);
					setKbdStatus(true);
				}}
				onBlur={() => {
					setEditing(false);
					setKbdStatus(false);
				}}

			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		padding: 16,
		backgroundColor: COLORS.inactiveBkg,
		marginBottom: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.borderGray,
		overflow: "hidden",
	},
	input: {
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		textDecorationLine: "none", //TODO: Android on password - how to remove?
		color: COLORS.mainText,
	},
});
