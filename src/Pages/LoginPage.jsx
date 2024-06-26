import fflogo from "../assets/FF-logo.png";
import Footer from "../layouts/Footer";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  const handleLoginSeller = () => {
    const user = {
      email: "test02@mail.com",
      password: "123456789",
    };
    login(user);
    navigate("/home");
  };

  const handleLoginAdmin = () => {
    const user = {
      email: "admin@mail.com",
      password: "123456789",
    };
    login(user);
    navigate("/admin");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-secondary h-screen flex flex-col">
      <div className="flex p-2 h-12 xl:h-24 items-center">
        <a className="btn btn-ghost text-x">
          <img className="w-auto h-full" src={fflogo} />
        </a>
        <div>
          <p className="text-2xl">Freshy Foodie</p>
          <p className="text-base">Freshly Meet, Freshly Eat</p>
        </div>
      </div>
      <div className="flex flex-1 h-screen justify-center items-center">
        <div className="bg-absolutewhite p-12 rounded-3xl">
          <label className="input input-bordered flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="Daisy" />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="daisy@site.com" />
          </label>
        </div>

        <div
          className="bg-green-500 w-40 text-white"
          onClick={handleLoginSeller}
        >
          TEST LOGIN BUYER+SELLER BUTTON
        </div>
        <div className="bg-red-500 w-40" onClick={handleLogout}>
          TEST LOGOUT BUTTON
        </div>

        <div
          className="bg-slate-400 w-40 text-white"
          onClick={handleLoginAdmin}
        >
          Login as ADMIN
        </div>
      </div>
      <Footer />
    </div>
  );
}
