import { useState } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import useStore from "../zustand/store";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import validateLogin from "../features/authentication/validators/login-validator";
import Modal from "../components/Modal";
import RegisterForm from "../features/authentication/RegisterForm";
import Button from "../components/Button";

const initialInput = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [openModal, setOpenModal] = useState(false);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
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
      <div className="flex flex-col flex-1 p-4 gap-4 h-screen justify-center items-center">
        <div className="xl:hidden flex flex-col w-full items-center">
          <p className="text-3xl font-bold text-darkyellow">
            Let&apos;s dive in!
          </p>
          <p className="text-xl font-medium text-graydarktext">Please log-in</p>
          <p className="text-sm font-medium text-graydarktext">
            to get voucher from the event.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-lightyellow px-12 py-8 rounded-3xl items-center">
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
          <Button onClick={handleSubmitForm}>Sign in</Button>
          <Button onClick={handleGoogleLogin}>Google</Button>
          <div className="divider h-0 m-0 border-t border-absoluteblack"></div>
          <p className="text-sm font-medium text-graydarktext">
            Don&apos;t have an account yet!
          </p>
          <Button onClick={() => setOpenModal(true)}>Register</Button>
          <Modal
            width="small"
            title="User Registration"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <RegisterForm />
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
