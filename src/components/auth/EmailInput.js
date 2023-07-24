import { View } from "react-native";
import StyledTextInput from "./StyledTextInput";

export default function EmailInput({ onEndEditing, setKbdStatus }) {
	return (
		<View>
			<StyledTextInput
				autoComplete="email"
				autoCapitalize="none"
				keyboardType="email-address"
				placeholder="Адреса електронної пошти"
				onEndEditing={onEndEditing}
				setKbdStatus={setKbdStatus}
			/>
		</View>
	);
}

				//value, 		value={value}
