import { View } from "react-native";
import StyledTextInput from "../StyledTextInput";

export default function EmailInput({ onChangeText, setKbdStatus, value }) {
	return (
		<View>
			<StyledTextInput
				value={value}
				autoComplete="email"
				autoCapitalize="none"
				keyboardType="email-address"
				placeholder="Адреса електронної пошти"
				onChangeText={onChangeText}
				setKbdStatus={setKbdStatus}
			/>
		</View>
	);
}
