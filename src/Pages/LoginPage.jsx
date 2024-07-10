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
import { ROLE } from "../constants/role-constants";

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

      if (response.existUser.role === ROLE.ADMIN) {
        navigate("/admin");
        return;
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-yellow-200 h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-1 p-4 gap-4 h-screen justify-center items-center">
        <div className="xl:hidden flex flex-col w-full items-center">
          <p className="text-3xl font-bold text-primary pb-2">
            Let&apos;s dive in!
          </p>
          <p className="text-xl text-graydarktext font-semibold">
            Please log-in
          </p>
          <p className="text-base font-semibold text-graydarktext">
            to get voucher from the event.
          </p>
        </div>
        <div className="flex flex-col gap-4 bg-lightyellow px-12 py-8 rounded-3xl items-center">
          <div className="flex flex-col gap-4 pb-2">
            <input
              placeholder="Email"
              name="email"
              className="h-10 pl-3 rounded-sm"
              onChange={handleChangeInput}
              value={input.email}
              error={inputError.email}
            />
            {/* <Input
              placeholder="Email"
              height="10"
              name="email"
              onChange={handleChangeInput}
              value={input.email}
              error={inputError.email}
            /> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="h-10 pl-3 rounded-sm"
              onChange={handleChangeInput}
              value={input.email}
              error={inputError.email}
            />
            {/* <Input
              placeholder="Password"
              height="10"
              name="password"
              type="password"
              onChange={handleChangeInput}
              value={input.password}
              error={inputError.password}
            /> */}
          </div>

          <Button onClick={handleSubmitForm}>
            <p className="font-normal h-7 flex justify-center items-center text-center">
              Sign in
            </p>
          </Button>
          {/* <Button onClick={handleGoogleLogin}>
            <p className="font-normal">Google</p>
          </Button> */}

          <button className="gsi-material-button" onClick={handleGoogleLogin}>
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  className="display-block"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-content text-base text-graylighttext hover:text-graydarktext ">
                Sign in with Google
              </span>
            </div>
          </button>

          <div className="divider  h-0 m-0 pt-2 pb-2 border-tertiary border-opacity-20"></div>
          <p className="text-sm font-semibold text-primary">
            Don&apos;t have an account yet!
          </p>
          <Button onClick={() => setOpenModal(true)}>
            <p className="font-normal h-7 flex justify-center items-center">
              Register
            </p>
          </Button>

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
