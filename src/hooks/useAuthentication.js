import { useSelector, useDispatch } from "react-redux";

import selectIsAuthenticated from "../store/auth/auth-selectors";
import authOperations from "../store/auth/authOperations";
import { setIsAuthenticated } from "../store/auth/authSlice";
import { auth } from "../firebase/config";

const useAuth = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(authOperations.logout());
  };

  const refreshUser = (payload) => dispatch(setIsAuthenticated(payload));


  return {
    isAuthenticated,
    user,
		onLogout,
		refreshUser,
	};
};

export default useAuth;

