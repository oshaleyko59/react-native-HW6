/*
<Plus stroke={COLORS.accent} fill="#fff" width={20} height={20} />
*/
import {
	Pressable,
	StyleSheet,
} from "react-native";
import { Camera } from "react-native-feather";
import { COLORS } from "../../common/constants";

export default function CameraBtn({dark, onPress}) {

  return (
		<Pressable
			style={({ pressed }) => [
				styles.cameraBtnContainer,
				pressed && styles.pressed,
			]}
			onPress={onPress}
		>
			{dark ? (
				<Camera
					stroke={COLORS.secondaryText}
					fill={COLORS.inactive}
					width={24}
					height={24}
				/>
			) : (
				<Camera
					stroke={COLORS.inactive}
					fill={COLORS.secondaryText}
					width={24}
					height={24}
				/>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	cameraBtnContainer: {
		width: 60,
		height: 60,
		backgroundColor: COLORS.mainBkg, //"transparent",
		opacity: 0.3,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
		borderWidth: 1,
		borderColor: COLORS.borderGray,
	},
	pressed: {
		opacity: 1, //0.1, FIXME:
		backgroundColor: COLORS.accent,
	},
});
