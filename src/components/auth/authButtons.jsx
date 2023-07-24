import { View } from "react-native";
import MainBtn from "../ui/MainBtn";
import AuthSecondaryBtn from "../ui/AuthSecondaryBtn";

export default function AuthButtons({ modeIsLogin, onSubmit, onMove }) {
	return (
		<View style={modeIsLogin ? { paddingBottom: 144 } : { paddingBottom: 78 }}>
			<MainBtn
				title={modeIsLogin ? "Увійти" : "Зареєстуватися"}
				onPress={onSubmit}
			/>
			<AuthSecondaryBtn
				title={modeIsLogin ? "Зареєструватися" : "Увійти"}
				hint={modeIsLogin ? "Немає акаунту?" : "Вже є акаунт?"}
				onPress={onMove}
			/>
		</View>
	);
}
