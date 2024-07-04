import { useEffect, useState } from "react";
import userApi from "../../apis/user";
import CouponTab from "../event/CouponTab";
import SellerVoucher from "../seller/SellerVoucher";

export default function CollectedCoupons() {
  const [collectedCouponArr, setCollectedCouponArr] = useState([]);
  const fetchCollectedCoupon = async () => {
    try {
      const result = await userApi.getCollectedCoupon();
      console.log("result from API getting collected coupons", result);
      setCollectedCouponArr(result.data);
    } catch (err) {
      console.log("error from getting collected coupons");
    }
  };
  useEffect(() => {
    fetchCollectedCoupon();
  }, []);

  return (
    <div className=" bg-white p-8 flex flex-col gap-4">
      <div className="bg-red-100">Search your coupon</div>
      <div className="flex flex-col gap-4">
        {collectedCouponArr.map((coupon, index) => (
          <CouponTab
            key={index}
            selectedEventDetails={coupon}
            useEnabled={true}
          />
        ))}
      </div>
    </div>
  );
}
