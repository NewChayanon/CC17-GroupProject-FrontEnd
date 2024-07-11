import React from "react";
import { useLocation } from "react-router-dom";
import { CouponIcon, StarDisabledIcon, StarIcon } from "../../icons";
import { getDayOfWeek } from "../../utils/datetime-conversion";

export default function ReviewCard({ review, key, id }) {
  const { pathname } = useLocation();
  // เอา rate คะแนนของแต่ละ review มาทำเป็น array เพื่อ render ดาวขึ้นมาแสดง
  const rate = {
    ONE: [1, 0, 0, 0, 0],
    TWO: [1, 1, 0, 0, 0],
    THREE: [1, 1, 1, 0, 0],
    FOUR: [1, 1, 1, 1, 0],
    FIVE: [1, 1, 1, 1, 1],
  };
  const star = rate[review.rate];
  const isEven = id % 2 === 0;
  const isReviewVerified = review.isVerify || false; // ต้องเอา input ของแต่ละ review มา ว่าเป็น verify review หรือไม่

  return (
    <div
      className={`flex flex-col py-5 px-6 gap-2.5 ${
        isEven ? "bg-graybg" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-base">{review.topic}</div>
        <div className="flex">
          {star.map((el) => {
            return el === 1 ? <StarIcon /> : <StarDisabledIcon />;
          })}
        </div>
      </div>
      <div className="text-sm">{review.comment}</div>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-primary text-sm">
            {`${review.commenterFirstName} ${review.commenterLastName}`}
          </div>
          <div className="text-sm">
            &nbsp;
            {`Review on ${review.createdAt}`}
          </div>
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
