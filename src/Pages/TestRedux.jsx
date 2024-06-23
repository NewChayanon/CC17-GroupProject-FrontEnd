import { useDispatch, useSelector } from "react-redux";
import { selectAuth, logout } from "../redux/store/slices/auth-slice";
import { loginAsync } from "../redux/store/thunks/auth-thunk";
import { useNavigate } from "react-router-dom";

export default function TestRedux() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(selectAuth);

  const handleLogin = () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      isSeller: true,
    };
    dispatch(loginAsync(user));
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const redirectToBooked = () => {
    navigate("/user/booked");
  };
  const redirectToSeller = () => {
    navigate("/seller");
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
      <div className="bg-white w-40" onClick={redirectToBooked}>
        TEST BOOKED REDIRECT
      </div>
      <div className="bg-white w-40" onClick={redirectToSeller}>
        TEST SELLER REDIRECT
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
