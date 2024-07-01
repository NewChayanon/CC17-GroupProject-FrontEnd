import React from "react";
import { useLocation } from "react-router-dom";
import { CouponIcon, StarDisabledIcon, StarIcon } from "../../icons";

export default function ReviewCard({ review, key, id }) {
  const { pathname } = useLocation();
  // รับ review data มาจาก API แล้วรัน  ต้องเอาคะแนน review ทีได้ มาทำเป็น array
  const star = [1, 1, 1, 0, 0]; // ต้องเอา input ของแต่ละ review มา ว่าได้กี่คะแนน แล้วเอามาสร้าง array คะแนน
  const isEven = id % 2 === 0;
  const isReviewVerified = true; // ต้องเอา input ของแต่ละ review มา ว่าเป็น verify review หรือไม่
  // if Id = even >> เป็น white bg
  return (
    <div
      className={`flex flex-col py-5 px-6 gap-2.5 ${
        isEven ? "bg-graybg" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-base">“Exceptional Durian Experience!”</div>
        <div className="flex">
          {star.map((el) => {
            return el === 1 ? <StarIcon /> : <StarDisabledIcon />;
          })}
        </div>
      </div>
      <div className="text-sm">
        I had an amazing experience with khun Thepparin. The durians were
        incredibly fresh and flavorful, straight from the Rayong farm. The
        quality and taste were outstanding. Highly recommend for all durian
        lovers!
      </div>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-primary text-sm">Supaporn Phantavee</div>
          <div className="text-sm">Reviewed on 23 June 2024</div>
        </div>
        {isReviewVerified && (
          <div className="text-primary text-sm flex gap-1 items-center">
            <CouponIcon />
            <div>Coupon used</div>
          </div>
        )}
      </div>
    </div>
  );
}
