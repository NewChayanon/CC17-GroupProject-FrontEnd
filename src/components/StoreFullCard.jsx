import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarDisabledIcon, StarIcon } from "../icons";
import useStore from "../zustand/store";
import Modal from "./Modal";
import PlaseLoginCard from "./PlaseLoginCard";
import ToggleButton from "./ToggleButton";

export default function StoreFullCard({ selectedStoreDetails }) {
  // Store Follow Status & Handle Click Follow
  const [isFollowed,setIsFollowed] = useState(false)
  const [openLoginModal,setOpenLoginModal] = useState(false)
  const isAuthenticated = useStore((state)=>state.isAuthenticated)
  console.log("selectedStore details in storeCard", selectedStoreDetails);

  const handleClickFollowShop = async (e) => {
    try{
     // 1. เช็คก่อนว่า Login รึยีง ถ้ายัง >> เด้ง error
     if (!isAuthenticated) {
      return setOpenLoginModal(true)
    }
    /// 2. trigger การ follow/unfollow ผ่าน API โดยการระบุ storeId
    // const result = await storeApi.toggleFolloeStoreById(selectedStoreDetails.id)
    // console.log("Result from API updating follow status",result);
    setIsFollowed((isFollowed) => !isFollowed)
  } catch(err){ console.log("error from updating interest", err);}
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
            {selectedStoreDetails.sellerFirstName}
          </div>
          <div className="text-base font-medium text-textgraydark">
            {selectedStoreDetails.sellerLastName || "Ruangmitphon"}
          </div>
        </div>
        {/* ========= Shop namd and followers ========= */}
        <div className="pl-44 pr-4 py-4">
          <div className="text-lg font-medium text-primary">
            {selectedStoreDetails.storeName}
          </div>
          <div className="flex justify-between items-end">
            <div className="pl-2">
              <div className="text-sm text-textgraylight">
                {" "}
                {selectedStoreDetails.storeFollowers} followers
              </div>
              <div className="text-sm text-textgraylight">
                {selectedStoreDetails.storeEvents} events
              </div>
              <div className="text-sm text-textgraylight">
                {selectedStoreDetails.storeVouchers} coupons
              </div>
            </div>
            {/* ========= Follow/unfollow Button ========= */}
            {/* <ToggleButton
              onClick={handleClickFollowShop}
              activeStateWord="Followed"
              inactiveStateWord="Follow"
              activeStateIcon={<StarIcon />}
              inactiveStateIcon={<StarDisabledIcon />}
            /> */}
            <div onClick={handleClickFollowShop}>
            {isFollowed?<StarIcon/>:<StarDisabledIcon/>}
            </div>
          </div>
        </div>
      </div>
      {/* ======== Modal เด้ง error กรณีที่ยังไม่ได้ login ======= */}
      <Modal width="small"
            title="Please Log-in to use the app features"
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}>
          <PlaseLoginCard onClose={() => setOpenLoginModal(false)}/>
            </Modal>
    </div>
  );
}
