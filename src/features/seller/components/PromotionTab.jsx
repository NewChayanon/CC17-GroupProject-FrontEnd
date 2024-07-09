import { EditIcon } from "../../../icons";

export default function PromotionTab() {
  return (
    <div className="bg-graybg gap-4 flex justify-between">
      <div className="w-[55%] max-w-96">
        <div className="border-2 border-absolutewhite rounded-lg p-2">
          <div className="flex justify-between">
            <p className="text-darkgreen font-bold text-base">
              Special deal from the store!
            </p>
            <EditIcon isGreen={true} />
          </div>
          <p className="text-sm font-normal">
            Early bird customers who liked our LINE Official store get 20%Off
            for the first time.
          </p>
          <br />
          <p className="text-sm font-bold">Conditions</p>
          <p className="text-sm font-normal">
            This promotion is valid until 31st December 2024. One Line user can
            use only 1 time.
          </p>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <p className="text-darkgreen font-bold text-base">
            Counpon for this event!
          </p>
          <div>**COUPON HERE**</div>
        </div>
        <button className="border-darkgreen border-2 rounded-lg px-4 py-2 text-darkgreen font-semibold text-sm hover:border-darkbrown hover:text-darkbrown">
          Generate coupon set for this event!
        </button>
      </div>
      <div className="bg-absolutewhite rounded-lg w-64 h-96">COUPON</div>
    </div>
  );
}
