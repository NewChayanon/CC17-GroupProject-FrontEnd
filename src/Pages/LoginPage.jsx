import fflogo from "../assets/FF-logo.png";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);

  return (
    <div className="bg-secondary h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 h-screen justify-center items-center">
        <div className="flex flex-col gap-4 bg-absolutewhite p-12 rounded-3xl items-center">
          <label className="input input-bordered h-10 flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input input-bordered h-10 flex items-center gap-2 bg-absolutewhite">
            <input type="text" className="grow" placeholder="password" />
          </label>
          <button className="btn w-40 h-10 min-h-10 border-0 shadow-sm text-absolutewhite bg-primary hover:bg-darkgreen">
            Sign in
          </button>
          <button className="btn w-40 h-10 min-h-10 border-0 shadow-sm text-absolutewhite bg-primary hover:bg-darkgreen">
            Google
          </button>
          <div className="divider h-0 m-0 border-t border-absoluteblack"></div>
          <button className="btn w-40 h-10 min-h-10 border-0 shadow-sm text-absolutewhite bg-tertiary hover:bg-darkbrown">
            Register
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
