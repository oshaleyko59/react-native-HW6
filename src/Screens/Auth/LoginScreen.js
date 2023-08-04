import { useDispatch } from "react-redux";

import AuthContent from "../../components/auth/AuthContent";
import authOperations from "../../utils/auth";

function LoginScreen() {
  const dispatch = useDispatch();

	async function loginHandler({ email, password }) {
    dispatch(authOperations.login({ email, password }));
	}

	return <AuthContent modeLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
