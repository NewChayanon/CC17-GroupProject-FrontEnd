import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import useStore from "../../zustand/store";
import validateRegister from "./validators/register-validator";
import { toast } from "react-toastify";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({onClose}) {
  const register = useStore((state) => state.register);
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
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
      onClose()
      toast.success('register complete')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full items-center px-4 pb-4 gap-3 pt-1">
      <div className="flex flex-col w-full gap-2">
        {/* <input
          name="firstname"
          placeholder="First Name"
          className="h-10 pl-3 w-full rounded-md border border-graylighttext"
          onChange={handleChangeInput}
          value={input.firstName}
        />
        <small className="text-red-600">{inputError.firstName}</small> */}
        <Input
          placeholder="First Name"
          height="10"
          name="firstName"
          onChange={handleChangeInput}
          value={input.firstName}
          error={inputError.firstName}
        />
        {/* <input
          name="lastname"
          placeholder="Last Name"
          className="h-10 pl-3 rounded-md border border-graylighttext"
          onChange={handleChangeInput}
          value={input.lastName}
          error={inputError.lastName}
        /> */}
        <Input
          placeholder="Last Name"
          height="10"
          name="lastName"
          onChange={handleChangeInput}
          value={input.lastName}
          error={inputError.lastName}
        />
        {/* <input
          name="email"
          placeholder="Email Address"
          className="h-10 pl-3 rounded-md border border-graylighttext"
          onChange={handleChangeInput}
          value={input.email}
          error={inputError.email}
        /> */}
        <Input
          placeholder="Email Address"
          height="10"
          name="email"
          onChange={handleChangeInput}
          value={input.email}
          error={inputError.email}
        />
        {/* <input
          name="password"
          type="password"
          placeholder="Password"
          className="h-10 pl-3 rounded-md border border-graylighttext"
          onChange={handleChangeInput}
          value={input.password}
          error={inputError.password}
        /> */}
        <Input
          placeholder="Password"
          height="10"
          name="password"
          type="password"
          onChange={handleChangeInput}
          value={input.password}
          error={inputError.password}
        />
        {/* <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="h-10 pl-3 rounded-md border border-graylighttext"
          onChange={handleChangeInput}
          value={input.confirmPassword}
          error={inputError.confirmPassword}
        /> */}
        <Input
          placeholder="Confirm Password"
          height="10"
          name="confirmPassword"
          type="password"
          onChange={handleChangeInput}
          value={input.confirmPassword}
          error={inputError.confirmPassword}
        />
      </div>
      <div className="pt-4">
        <Button onClick={handleSubmitForm}>
          <p className="font-normal h-7 flex justify-center items-center">
            Confirm
          </p>
        </Button>
      </div>
    </div>
  );
}
