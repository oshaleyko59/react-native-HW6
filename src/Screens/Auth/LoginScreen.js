import { useDispatch } from "react-redux";

import authOperations from "../../store/auth/authOperations";
import AuthContent from "../../components/auth/AuthContent";

function LoginScreen() {
  const dispatch = useDispatch();

	async function loginHandler({ email, password }) {
    dispatch(authOperations.login({ email, password }));
	}

	return <AuthContent modeLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
