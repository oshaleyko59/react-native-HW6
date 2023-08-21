import { Alert } from "react-native";

const handleError = (msg, error) => {
	console.log(msg + "(handleError):" + error.message);
	Alert.alert(msg, error.message);
};

export default handleError;
