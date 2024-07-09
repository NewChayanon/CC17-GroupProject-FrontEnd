import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function ActivateStoreFromMobile() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-auto justify-center p-24 bg-tertiary border border-yellow-600 border-x-0 border-b-0 ">
      <div className="flex flex-col h-fit bg-white p-8 pt-4 rounded-2xl gap-3">
        <div className="flex justify-between pt-2">
          <div className="flex flex-col text-primary font-semibold ">
            <div className="flex text-2xl">
              Hi<div>&nbsp;username</div>!
            </div>
            <div className="text-base">Let's Create Your Store</div>
          </div>
          <div>
            <button>&#10005;</button>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-3">
          <Input height="9" placeholder="Store Name (up to 20 letters)" />
          <div className="w-auto pt-1 gap-1 flex flex-col">
            <label
              for="sellingProduct"
              className="text-primary font-semibold text-base"
            >
              What do you sell?
            </label>

            <select
              className="p-2 border w-full rounded-md border-graylighttext text-graylighttext"
              name="sellingProduct"
              height="9"
              id="sellingProduct"
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
            <Button
              width="large"
              onClick={() => navigate("/mystore/invalid-from-mobile")}
            >
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
