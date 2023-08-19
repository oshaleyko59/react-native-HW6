import AuthContent from "../../components/auth/AuthContent";
import useAuth from "../../hooks/useAuth";

function RegistrationScreen() {
  const {onRegister } = useAuth();

  async function signupHandler({ name, email, password }) {
    onRegister({ email, password, name });
  }

	return <AuthContent modeLogin={false} onAuthenticate={signupHandler} />;
}

export default RegistrationScreen;
