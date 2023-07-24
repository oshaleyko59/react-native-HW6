import { Plus, X } from "react-native-feather";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../common/constants";

export default function Avatar({ modeAdd}) {
	return (
		<View style={styles.holder}>
			<View style={styles.circled}>
				{modeAdd ? (
					<Plus stroke={COLORS.accent} fill="#fff" width={20} height={20} />
				) : (
					<X stroke={COLORS.accent} fill="#fff" width={20} height={20} />
				)}
			</View>
		</View>
	);
}
//TODO: pressable icon

/*  import { Plus, X } from "react-native-feather";
<Plus stroke={COLORS.accent} fill="#fff" width={20} height={20} />
*/

const styles = StyleSheet.create({
	holder: {
		position: "absolute",
		left: "50%",
		top: -60,
		transform: [{ translateX: -60 }],
		zIndex: 2,
		width: 120,
		height: 120,
		borderRadius: 16,
		backgroundColor: COLORS.inactiveBkg,
	},
	circled: {
		height: 25,
		width: 25,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: -12,
		top: 81,
		borderRadius: 12.5,
		borderColor: COLORS.accent,
		borderWidth: 1,
		backgroundColor: COLORS.mainBkg,
	},
});


/*
			<PlusCircle
				stroke={COLORS.accent}
				fill="#fff"
				width={27}
				height={27}
				style={{ position: "absolute", right: -10, top: 81 }}
			/>
      */
