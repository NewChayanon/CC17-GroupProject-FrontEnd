import { useEffect } from "react";
import { SearchIcon } from "../../icons";
import useStore from "../../zustand/store";
import CouponFullRightTab from "./components/CouponFullRightTab";
import CouponTab from "./components/CouponTab";
import { useState } from "react";

export default function SellerVoucher() {
  const getMyCoupons = useStore((state) => state.getMyCoupons);
  const couponInfo = useStore((state) => state.couponInfo);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // const numberOfCoupons = couponInfo.length;

  useEffect(() => {
    const fetchData = async () => {
      await getMyCoupons();
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-start overflow-auto  w-full h-auto">
      <div className="flex flex-col justify-start">
        <form className="flex justify-between items-center gap-2 p-4 pb-0 w-auto">
          <input
            value=""
            onChange=""
            className="flex w-full bg-white p-1 pl-4 border border-gray-300 rounded-full"
            type="text"
            placeholder="Search Coupon "
          />
          <SearchIcon />
        </form>
        <div className="flex flex-col   ">
          <div className="flex p-2 pr-6 text-sm">
            <div className="font-semibold pl-4">Your store coupon amount:</div>
            <div>&nbsp; 3 coupons</div>
          </div>
          <div className="flex justify-start">
            {couponInfo && (
              <div className=" flex flex-col p-5 pt-0 gap-4 w-[550px]">
                {couponInfo.map((el) => (
                  <CouponTab
                    key={el.voucherItemId}
                    storeName={el.storeName}
                    eventName={el.eventName}
                    voucherDescription={el.voucherDescription}
                    eventStartDate={el.eventStartDate.split("T")[0]}
                    eventEndDate={el.eventEndDate.split("T")[0]}
                    voucherCode={el.voucherCode}
                    voucherImage={el.voucherImage}
                    onClick={() => setSelectedCoupon(el.voucherItemId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-10 pb-0 text-xl text-center font-semibold text-primary">
          Full Details of Selected Coupon
        </div>
        {couponInfo && (
          <div className="flex flex-col gap-4 px-14">
            {couponInfo.map(
              (el) =>
                selectedCoupon === el.voucherItemId && (
                  <CouponFullRightTab
                    key={el.voucherItemId}
                    storeName={el.storeName}
                    eventName={el.eventName}
                    voucherCondition={el.voucherCondition}
                    voucherDescription={el.voucherDescription}
                    eventStartDate={el.eventStartDate}
                    eventEndDate={el.eventEndDate}
                    voucherCode={el.voucherCode}
                    voucherImage={el.voucherImage}
                    image={el.image}
                  />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
