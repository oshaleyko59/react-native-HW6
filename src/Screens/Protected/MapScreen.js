import React from "react";
import { useRoute } from "@react-navigation/native";
import { View,  StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker }  from 'react-native-maps';

export default function MapScreen() {
  const route = useRoute();
  const { lat, lng } = route.params.location;

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: lat,
					longitude: lng,
					latitudeDelta: 0.3,
					longitudeDelta: 0.2,
				}}
				style={styles.map}
			>
				<Marker
					coordinate={{ latitude: lat, longitude: lng }}
					title={route.params.title}
				/>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
