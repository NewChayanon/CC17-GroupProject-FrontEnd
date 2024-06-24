import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../redux/store/thunks/auth-thunk";
import { logout } from "../../redux/store/slices/auth-slice";
import { getAccessToken } from "../../utils/local-storage";

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      if (getAccessToken()) {
        await dispatch(getAuthUser()).unwrap();
      }
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    fetchUser(), [];
  });

  return children;
}
