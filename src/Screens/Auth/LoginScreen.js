import { useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../../components/auth/AuthContent';
import Loading from '../../components/ui/Loading';
import { useAuthContext } from '../../store/auth-context';

function LoginScreen() {
  const [isBusy, setIsBusy] = useState(false);

  const {authenticate} = useAuthContext();

  async function loginHandler({ email, password }) {
    setIsBusy(true);
    try {
      authenticate({ email, password });
    } catch (error) {
      console.error('error', error);
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials!'
      );
    } finally {
      setIsBusy(false);
    }
  }

  if (isBusy) {
    return <Loading msg="Logging you in..." />;
  }

  return <AuthContent modeLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;
