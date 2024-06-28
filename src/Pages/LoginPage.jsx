import { useState } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import validateLogin from "../features/authentication/validators/login-validator";
import Modal from "../components/Modal";
import RegisterForm from "../features/authentication/RegisterForm";

const initialInput = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    console.log("google");
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        setInputError(error);
        return;
      }

      setInputError(initialInput);

      const response = await login(input);
      if (response.message === "Invalid credential") {
        console.log(response.message);
        setInputError({
          ...initialInput,
          password: "Wrong password. Please type again!",
        });
        return;
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary h-screen flex flex-col">
      <Header />
      <div className="xl:hidden flex flex-col w-full items-center">
        <p>Let&apos;s dive in!</p>
        <p>Please log-in</p>
        <p>to get voucher from the event.</p>
      </div>
      <div className="flex flex-1 h-screen justify-center items-center">
        <div className="flex flex-col gap-4 bg-absolutewhite p-12 rounded-3xl items-center">
          <div className="flex flex-col gap-4 pb-2">
            <Input
              placeholder="Email"
              height="10"
              name="email"
              onChange={handleChangeInput}
              value={input.email}
              error={inputError.email}
            />
            <Input
              placeholder="Password"
              height="10"
              name="password"
              type="password"
              onChange={handleChangeInput}
              value={input.password}
              error={inputError.password}
            />
          </div>
          <button
            onClick={handleSubmitForm}
            className="btn w-40 h-10 min-h-10 border-0 shadow-sm text-absolutewhite bg-primary hover:bg-darkgreen"
          >
            Sign in
          </button>
          <button
            onClick={handleGoogleLogin}
            className="btn w-40 h-10 min-h-10 border-0 shadow-sm text-absolutewhite bg-primary hover:bg-darkgreen"
          >
            Google
          </button>
          <div className="divider h-0 m-0 border-t border-absoluteblack"></div>
          <Modal modalID="register-modal" callToAction="Register">
            <RegisterForm />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
