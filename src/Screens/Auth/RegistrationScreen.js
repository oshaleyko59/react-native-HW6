import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

import AuthContent from "../../components/auth/AuthContent";
import Loading from "../../components/ui/Loading";
import { authRegister } from "../../store/auth/authOperations";

//import { useAuthContext } from "../../store/auth-context";

function RegistrationScreen() {
  const [isBusy, setIsBusy] = useState(false);

	const dispatch = useDispatch();

	//const { authenticate } = useAuthContext();

	async function signupHandler({ name, email, password }) {
		setIsBusy(true);
		try {
      dispatch(authRegister({ name, email, password }));  //authenticate({ name, email, password });
		} catch (error) {
			Alert.alert(
				"Authentication failed",
				"Could not create user, please check your input."
			);
		} finally {
			setIsBusy(false);
		}
	}

	if (isBusy) {
		return <Loading msg="Logging you in..." />;
	}

	return <AuthContent modeLogin={false} onAuthenticate={signupHandler} />;
}

export default RegistrationScreen;
