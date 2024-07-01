import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useStore from "../../zustand/store";
import validateRegister from "./validators/register-validator";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const register = useStore((state) => state.register);
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
  };

  const handleClose = () => {
    setInput(initialInput);
    setInputError(initialInput);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        setInputError(error);
        return;
      }
      setInputError(initialInput);
      const response = await register(input);
      console.log(response);
      if (response.message === "email already in use") {
        setInputError({
          ...inputError,
          email: "Email is already used.",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 pb-4 gap-4">
      <Input
        placeholder="First Name"
        height="10"
        name="firstName"
        onChange={handleChangeInput}
        value={input.firstName}
        error={inputError.firstName}
      />
      <Input
        placeholder="Last Name"
        height="10"
        name="lastName"
        onChange={handleChangeInput}
        value={input.lastName}
        error={inputError.lastName}
      />
      <Input
        placeholder="Email Address"
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
      <Input
        placeholder="Confirm Password"
        height="10"
        name="confirmPassword"
        type="password"
        onChange={handleChangeInput}
        value={input.confirmPassword}
        error={inputError.confirmPassword}
      />
      <Button onClick={handleSubmitForm}>Confirm</Button>
    </div>
  );
}
