import React from "react";
import { useNavigate } from "react-router-dom";
import { StarDisabledIcon, StarIcon } from "../icons";
import ToggleButton from "./ToggleButton";

export default function StoreFullCard({ selectedEventDetails = {} }) {
  const handleClickFollowShop = (e) => {
    /// 1. check ว่า user login อยู่หรือไม่
    /// 2. trigger การ follow/unfollow ผ่าน API
    console.log(e);
  };
  return (
    <div className="bg-white">
      <div className="relative">
        {/* ========= Seller Image and Name ========= */}
        <div className="absolute left-4 -top-16 text-center">
          <img
            className="mb-2"
            style={{
              height: "112px",
              width: "112px",
              objectFit: "cover",
              display: "block",
              borderRadius: "50%",
            }}
            src="https://picsum.photos/seed/picsum/400/200"
          />
          <div className="text-base font-medium text-textgraydark">
            {selectedEventDetails.sellerFirstName || "Thepparin "}
          </div>
          <div className="text-base font-medium text-textgraydark">
            {selectedEventDetails.sellerLastName || "Ruangmitphon"}
          </div>
        </div>
        {/* ========= Shop namd and followers ========= */}
        <div className="pl-44 pr-4 py-4">
          <div className="text-lg font-medium text-primary">
            {selectedEventDetails.storeName || "Lovelove Durian"}
          </div>
          <div className="flex justify-between items-end">
            <div className="pl-2">
              <div className="text-sm text-textgraylight">
                {" "}
                {selectedEventDetails.countFollower} followers
              </div>
              <div className="text-sm text-textgraylight">
                {selectedEventDetails.countEventOfSeller} events
              </div>
              <div className="text-sm text-textgraylight">
                {selectedEventDetails.sumVoucherSeller} coupons
              </div>
            </div>
            {/* ========= Follow/unfollow Button ========= */}
            <ToggleButton
              onClick={handleClickFollowShop}
              activeStateWord="Followed"
              inactiveStateWord="Follow"
              activeStateIcon={<StarIcon />}
              inactiveStateIcon={<StarDisabledIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
