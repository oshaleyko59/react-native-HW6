import { useDispatch } from "react-redux";

import authOperations from "../../store/auth/authOperations";
import AuthContent from "../../components/auth/AuthContent";

function RegistrationScreen() {
  const dispatch = useDispatch();

	async function signupHandler({ name, email, password }) {
		dispatch(authOperations.register({ email, password, name }));
  }

	return <AuthContent modeLogin={false} onAuthenticate={signupHandler} />;
}

export default RegistrationScreen;
