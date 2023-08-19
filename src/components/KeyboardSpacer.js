/**
 * Created by andrewhurst on 10/5/15.
 * refactored to functional components by osha on 08/18/23
 */
import React, { useState, useEffect } from "react";
import {
	Keyboard,
	LayoutAnimation,
	View,
	Dimensions,
	//only IOS   Platform, works oddly for Android (events not adequate)
	StyleSheet,
} from "react-native";

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
	duration: 500,
	create: {
		duration: 300,
		type: LayoutAnimation.Types.easeInEaseOut,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.spring,
		springDamping: 200,
	},
};

export default function KeyboardSpacer({
	topSpacing = 0,
	onToggle = () => null,
	style,
}) {
	const [kbdState, setKbdState] = useState({
		keyboardSpace: 0,
		isKeyboardOpened: false,
	});

	useEffect(() => {
    const updateListener = "keyboardWillShow"; //Platform.OS === "android" ? "keyboardDidShow" :
		const resetListener ="keyboardWillHide";	//Platform.OS === "android" ? "keyboardDidHide" :
		const listeners = [
			Keyboard.addListener(updateListener, updateKeyboardSpace),
			Keyboard.addListener(resetListener, resetKeyboardSpace),
		];
	  //	consol e.info("ADDING LSNRS...", listeners);
		return () => {
		//	conso le.info("REMOVING LSNRS...", listeners);
			listeners.forEach((listener) => listener.remove());
		};
	}, []);

	function updateKeyboardSpace(event) {
		if (!event.endCoordinates) {
			return;
		}

		let animationConfig = defaultAnimation;
		//if (Platform.OS === "ios") {}
			animationConfig = LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing],
				LayoutAnimation.Properties.opacity
			);

		LayoutAnimation.configureNext(animationConfig);

		// get updated on rotation
		const screenHeight = Dimensions.get("window").height;
		// when external physical keyboard is connected
		// event.endCoordinates.height still equals virtual keyboard height
		// however only the keyboard toolbar is showing if there should be one
		const keyboardSpace =
			screenHeight - event.endCoordinates.screenY + topSpacing;
		setKbdState({
			keyboardSpace,
			isKeyboardOpened: true,
    });
		onToggle(true, keyboardSpace);
	}

  function resetKeyboardSpace(event) {
	//	let animationConfig = defaultAnimation;
	//only ios	if (Platform.OS === "ios") {}
	const	animationConfig = LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing],
				LayoutAnimation.Properties.opacity
			);

		LayoutAnimation.configureNext(animationConfig);

		setKbdState(
			{
				keyboardSpace: 0,
				isKeyboardOpened: false,
			}
		);
		onToggle(false, 0);
	}

	return (
		<View
			style={[styles.container, { height: kbdState.keyboardSpace }, style]}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		left: 0,
		right: 0,
		bottom: 0,
	},
});
