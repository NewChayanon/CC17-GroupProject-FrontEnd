import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function TestZustand() {
  const navigate = useNavigate();

  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const handleLoginSeller = () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      isSeller: true,
      isAdmin: false,
    };
    login(user);
  };

  const handleLoginAdmin = () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      isSeller: false,
      isAdmin: true,
    };
    login(user);
  };

  const handleLogout = () => {
    logout();
  };

  const redirectToBooked = () => {
    navigate("/home/user/booked");
  };

  return (
    <div>
      <h1>TEST Zustand</h1>
      <div className="bg-green-500 w-40 text-white" onClick={handleLoginSeller}>
        TEST LOGIN BUYER+SELLER BUTTON
      </div>
      <div className="bg-red-500 w-40" onClick={handleLogout}>
        TEST LOGOUT BUTTON
      </div>
      <div className="bg-white w-40" onClick={redirectToBooked}>
        TEST BOOKED REDIRECT
      </div>
      <div className="bg-slate-400 w-40 text-white" onClick={handleLoginAdmin}>
        Login as ADMIN
      </div>
      {isAuthenticated ? (
        <p className="text-green-500">Login</p>
      ) : (
        <p className="text-red-500">Not Login</p>
      )}

      <Modal callToAction="test1" modalID="modal1">
        dadawdawdaadsasdad
      </Modal>
      <Modal callToAction="test2" modalID="modal2"></Modal>
      <Modal callToAction="test3" modalID="modal3"></Modal>
    </div>
  );
}
