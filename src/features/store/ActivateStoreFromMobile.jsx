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
          <Input height="9" placeholder="What do you want to sell?" />
          <div className="pt-5 flex justify-center">
            <Button
              width="large"
              onClick={() => navigate("/mystore/invalid-from-mobile")}
            >
              Create my store now!
            </Button>
          </div>
          <div className="text-[10px] leading-snug text-red-500 font-semibold">
            *Once the store is created, your store name cannot be changed.
          </div>
        </div>
      </div>
    </div>
  );
}
