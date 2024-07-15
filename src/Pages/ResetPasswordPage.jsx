import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import validateReset from "./validators/reset-validator";
import authApi from "../apis/auth";
import { toast } from "react-toastify";

const data ={
  email:""
}

export default function ResetPasswordPage() {
  const [input, setInput] = useState(data);
  const [inputError, setInputError] = useState(data);

  const handleChangeInput = (e) => {
    console.log("handleChangeInput", e);
    setInput({...input, [e.target.name]: e.target.value})
    setInputError({...inputError, [e.target.name]:""})

  };

  const handleClickSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = validateReset(input);
      console.log(error)
      if(error){
        setInputError(error)
        return;
      }
      console.log('data',data)
      setInputError(data)
      const res = await authApi.resetPassword(input)
      console.log('res',res)
      toast.success('send an email complete')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-yellow-200 h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white rounded-2xl w-80 h-96 p-6">
            <div className="text-xl text-center">Reset account password</div>
            <br />
            <div className="text-center">
              Enter the email address associated with your account and we'll
              send you a key to reset your password.
              <div className="pt-5 pb-10 flex justify-start items-center">
                Email:
                <Input
                  placeholder="Enter an Email address"
                  name="email"
                  value={input.email}
                  error={inputError.email}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <Button width="full"
              onClick={handleClickSubmit}
            >
              Submit
            </Button>
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
