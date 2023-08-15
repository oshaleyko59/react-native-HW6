import { NavigationContainer } from "@react-navigation/native";
import { useStackNavigator } from "../hooks/useStackNavigator";

export default function Root() {
	const { getStackNavigator } = useStackNavigator();

	return (
		<NavigationContainer>
			{getStackNavigator()}
		</NavigationContainer>
	);
}
