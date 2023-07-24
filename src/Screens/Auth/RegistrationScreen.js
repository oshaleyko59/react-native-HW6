import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../../components/auth/AuthContent";
import Loading from "../../components/ui/Loading";

import { useAuthContext } from "../../store/auth-context";

function RegistrationScreen() {
const [isBusy, setIsBusy] = useState(false);

	const { authenticate } = useAuthContext();

	async function signupHandler({ name, email, password }) {
		setIsBusy(true);
		try {
      authenticate({ name, email, password });
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

  return <AuthContent modeLogin={false }  onAuthenticate={signupHandler} />;
}

export default RegistrationScreen;
