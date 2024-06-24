import { useDispatch, useSelector } from "react-redux";
import { selectAuth, logout } from "../redux/store/slices/auth-slice";
import { loginAsync } from "../redux/store/thunks/auth-thunk";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function TestRedux() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(selectAuth);

  const handleLoginSeller = () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      isSeller: true,
      isAdmin: false,
    };
    dispatch(loginAsync(user));
  };
  const handleLoginAdmin = () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      isSeller: false,
      isAdmin: true,
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
    navigate("/seller/myshop");
  };

  return (
    <div>
      <h1>TEST REDUX</h1>
      <div className="bg-green-500 w-40 text-white" onClick={handleLoginSeller}>
        TEST LOGIN BUYER+SELLER BUTTON
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
      <div className="bg-slate-400 w-40 text-white" onClick={handleLoginAdmin}>
        Login as ADMIN
      </div>
      {isAuthenticated ? (
        <p className="text-green-500">Login</p>
      ) : (
        <p className="text-red-500">Not Login</p>
      )}
      <p>{status}</p>

      <Modal callToAction="test1" modalID="modal1">
        dadawdawdaadsasdad
      </Modal>
      <Modal callToAction="test2" modalID="modal2"></Modal>
      <Modal callToAction="test3" modalID="modal3"></Modal>
    </div>
  );
}
