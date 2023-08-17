import { Alert } from "react-native";

const handleError = (msg, error) => {
	console.error(msg + "(handleError):" + error.message);
	Alert.alert(msg, error.message);
};

export default handleError;
