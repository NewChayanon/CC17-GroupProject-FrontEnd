import { EditIcon } from "../../../icons";
import useStore from "../../../zustand/store";
import CouponFullRightTab from "./CouponFullRightTab";
import CouponTab from "./CouponTab";

export default function PromotionTab() {
  const selectedEvent = useStore((state) => state.selectedEvent);
  const { promotion } = selectedEvent;

  return (
    <>
      {promotion.length >= 1 ? (
        promotion.map((e) => (
          <div
            key={e.voucherListDiscount}
            className="bg-graybg gap-4 flex justify-between"
          >
            <div className="w-[55%]">
              <div className="border-2 border-absolutewhite rounded-lg p-2">
                <div className="flex justify-between">
                  <p className="text-darkgreen font-bold text-base">
                    Special deal from the store!
                  </p>
                  {/* <EditIcon isGreen={true} /> */}
                </div>
                <p className="text-sm font-normal">{e.description}</p>
                <br />
                <p className="text-sm font-bold">Conditions</p>
                <p className="text-sm font-normal">{e.condition}</p>
              </div>
              <div className="gap-2 p-2 hidden 2xl:flex 2xl:flex-col">
                <p className="text-darkgreen font-bold text-base">
                  Coupon for this event!
                </p>
                <div className="w-full">
                  <CouponTab
                    storeName={selectedEvent.storeProfileName}
                    eventName={selectedEvent.eventName}
                    voucherDescription={e.description}
                    eventStartDate={selectedEvent.eventStartDate}
                    eventEndDate={selectedEvent.eventEndDate}
                    voucherImage={e.image}
                    voucherCode={e.code}
                  />
                </div>
              </div>
            </div>
            <div className="bg-absolutewhite p-4 rounded-lg overflow-hidden">
              <CouponFullRightTab
                storeName={selectedEvent.storeProfileName}
                eventName={selectedEvent.eventName}
                voucherCondition={e.condition}
                voucherDescription={e.description}
                voucherImage={e.image}
                voucherCode={e.code}
                eventStartDate={selectedEvent.eventStartDate}
                eventEndDate={selectedEvent.eventEndDate}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex pt-12 justify-center">
          <button className="border-darkgreen border-2 rounded-lg px-4 py-2 text-darkgreen font-semibold text-sm hover:border-darkbrown hover:text-darkbrown">
            Generate coupon set for this event!
          </button>
        </div>
      )}
    </>
  );
}
