import { useState } from "react";
import { View, TextInput, StyleSheet} from "react-native";
import { COLORS } from "../../common/constants";

export default function StyledTextInput({
	onEndEditing,
	secureTextEntry,
	placeholder,
	keyboardType,
	autoCapitalize,
	autoComplete,
	setKbdStatus,
}) {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("");

	return (
		<View>
			<TextInput
				style={[
					styles.input,
					editing
						? { borderColor: COLORS.accent }
						: { borderColor: COLORS.borderGray },
				]}
				autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
				keyboardType={keyboardType}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				value={text}
				onChangeText={(value) => setText(value)}
				onFocus={() => {
					setEditing(true);
					setKbdStatus(true);
				}}
				onBlur={() => {
					setEditing(false);
					setKbdStatus(false);
				}}
				onEndEditing={() => {
					onEndEditing(text);

				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
		height: 50,
		padding: 16,
		borderRadius: 8,
		borderWidth: 1,
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		textDecorationLine: "none", //TODO: Android on password - how to remove?
		backgroundColor: COLORS.inactiveBkg,
		color: COLORS.mainText,
	},
});
