import AuthContent from "../../components/auth/AuthContent";
import useAuth from "../../hooks/useAuth";

function LoginScreen() {
  const { onLogin} = useAuth();

	async function loginHandler({ email, password }) {
    onLogin({ email, password }); 
	}

	return <AuthContent modeLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
