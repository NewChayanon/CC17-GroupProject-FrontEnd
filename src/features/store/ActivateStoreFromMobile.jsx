import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState } from "react";
import useStore from "../../zustand/store";

export default function ActivateStoreFromMobile() {
  const navigate = useNavigate();
  const initialInput = { name: "", storeProductType: "fruits" };
  const user = useStore((state) => state.user);
  const activateMyStore = useStore((state) => state.activateMyStore);
  const [input, setInput] = useState(initialInput);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitChange = async () => {
    try {
      await activateMyStore(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full h-auto justify-center p-24 bg-tertiary border border-yellow-600 border-x-0 border-b-0 ">
      <div className="flex flex-col h-fit bg-white p-8 pt-4 rounded-2xl gap-3">
        <div className="flex justify-between pt-2">
          <div className="flex flex-col text-primary font-semibold ">
            <div className="flex text-2xl">
              Hi<div>&nbsp;{user.displayName}</div>!
            </div>
            <div className="text-base">Let's Create Your Store</div>
          </div>
          <div>
            <button>&#10005;</button>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-3">
          <Input
            name="name"
            value={input.name}
            onChange={handleChange}
            height="9"
            placeholder="Store Name (up to 20 letters)"
          />
          <div className="w-auto pt-1 gap-1 flex flex-col">
            <label
              for="sellingProduct"
              className="text-primary font-semibold text-base"
            >
              What do you sell?
            </label>

            <select
              className="p-2 border w-full rounded-md border-graylighttext text-graylighttext"
              height="9"
              id="storeProductType"
              name="storeProductType"
              value={input.storeProductType}
              onChange={handleChange}
            >
              <option value="fruits">fruits</option>
              <option value="breads">breads</option>
              <option value="drinks">drinks</option>
              <option value="skewers">skewers</option>
              <option value="chilliPaste">Chilli Paste</option>
              <option value="others">others</option>
            </select>
          </div>

          <div className="pt-5 flex justify-center">
            <Button width="large" onClick={submitChange}>
              <div className="font-normal text-base h-7 flex justify-center items-center">
                Create my store now!
              </div>
            </Button>
          </div>
          <div className="text-[11px] leading-snug text-red-500 font-semibold">
            *Once the store is created, your store name cannot be changed.
          </div>
        </div>
      </div>
    </div>
  );
}
