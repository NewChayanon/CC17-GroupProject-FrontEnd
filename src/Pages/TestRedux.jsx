import { useDispatch, useSelector } from "react-redux";
import { selectAuth, logout } from "../redux/store/slices/auth-slice";
import { loginAsync } from "../redux/store/thunks/auth-thunk";

export default function TestRedux() {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(selectAuth);

  const handleLogin = () => {
    const user = { name: "John Doe", email: "john@example.com" };
    dispatch(loginAsync(user));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>TEST REDUX</h1>
      <div className="bg-green-500 w-40" onClick={handleLogin}>
        TEST LOGIN BUTTON
      </div>
      <div className="bg-red-500 w-40" onClick={handleLogout}>
        TEST LOGOUT BUTTON
      </div>
      {isAuthenticated ? (
        <p className="text-green-500">Login</p>
      ) : (
        <p className="text-red-500">Not Login</p>
      )}
      <p>{status}</p>
    </div>
  );
}
