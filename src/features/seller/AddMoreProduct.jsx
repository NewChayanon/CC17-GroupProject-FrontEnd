/* eslint-disable react/prop-types */
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import myStoreApi from "../../apis/my-store";

const initialInput = {
  productName: "",
  productDescription: "",
  productPrice: "",
  productUnit: "",
};
// const errorInitialInput = {
//   productName: "",
//   productDescription: "",
//   productPrice: "",
//   productUnit: "",
// };

export default function AddMoreProduct({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [file, setFile] = useState(null);
  //   const [errorMessage, setErrorMessage] = useState(errorInitialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // const error = editProductValidator(input);
      // const { errorValidatorCoffee } = handleValidateCoffee(input);
      // if (error) {
      //   error.coffee = errorValidatorCoffee;
      //   return setErrorMessage(error);
      // }
      // setErrorMessage(initialErrorMessage);
      const formData = new FormData();
      formData.append("image", file);
      Object.keys(input).forEach((key) => {
        if (input[key]) formData.append(key, input[key]);
      });
      await myStoreApi.addMoreProduct(formData);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span>Product Name</span>
        <Input placeholder="Durian Monthong" onChange={handleChangeInput} value={input.productName} name="productName" />
      </div>
      <div>
        <span>Description</span>
        <Input placeholder="rfakjahklajsldksjldsadlsf" onChange={handleChangeInput} value={input.productDescription} name="productDescription" />
      </div>
      <div>
        <span>Product Image</span>
        <div className="border h-52 flex flex-col justify-center items-center">
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <div>
            <span>Drag & drop or </span>
            <span className="text-primary">browse</span>
          </div>
        </div>
      </div>
      <div>
        <span>Product Price</span>
        <div className="flex">
          <div>
            <Input placeholder="120" onChange={handleChangeInput} value={input.productPrice} name="productPrice" />
          </div>
          <div className="flex">
            <div className="flex items-center gap-1">
              <input type="radio" id="perUnit" value="UNIT" onChange={handleChangeInput} name="productUnit" />
              <label htmlFor="perUnit">Per unit</label>
            </div>
            <div className="flex items-center gap-1">
              <input className="" type="radio" id="perKilo" value="KG" onChange={handleChangeInput} name="productUnit" />
              <label htmlFor="perKilo">Per Kilo</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start">
        <Button onClick={handleSubmitForm}>Add more product</Button>
      </div>
    </div>
  );
}
