import { useDispatch } from "react-redux";

import AuthContent from "../../components/auth/AuthContent";
import authOperations from "../../utils/auth";

function RegistrationScreen() {
  const dispatch = useDispatch();
  
	async function signupHandler({ name, email, password }) {
		dispatch(authOperations.register({ email, password }));
  }

	return <AuthContent modeLogin={false} onAuthenticate={signupHandler} />;
}

export default RegistrationScreen;
