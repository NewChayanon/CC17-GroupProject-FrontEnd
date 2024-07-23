import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import storeApi from "../../../apis/store";
import { StarDisabledIcon, StarIcon } from "../../../icons";

export default function FavoriteStoreCard({
  storeDetail,
  key,
  setIsUpdateFavoriteStore,
}) {
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    setIsFollowed(storeDetail.follow);
  }, [storeDetail]);
  console.log("Store Detail", storeDetail);
  // function to handle click unfollow store
  const handleClickUnfollow = async (e) => {
    try {
      const result = await storeApi.toggleFollowStoreById(
        storeDetail.storeProfileId
      );
      console.log("Result from unfollowing seller");
      // Update state การ unfollow store ให้เป็น true เพื่อให้หน้า user/favorite-stores rerender
      setIsUpdateFavoriteStore(true);
    } catch (err) {
      console.log("error from api unfollow store", err);
    }
  };
  return (
    <div className="w-full h-[80px] flex gap-4 items-center bg-white shadow">
      <div className="overflow-hidden">
        <img
          className="w-[110px] h-[80px] object-fit block"
          src={storeDetail.storeImage}
        />
      </div>
      <div className="grow py-2">
        <Link to={`/store/${storeDetail.storeProfileId}/profile`}>
          <div className="text-base font-bold">{storeDetail.storeName}</div>
        </Link>
        <div className="flex gap-2">
          <div className="text-sm text-primary">
            {storeDetail.followers} followers
          </div>
          <div className="text-sm text-primary">
            {storeDetail.events} events
          </div>
        </div>
        <div className="text-sm text-primary">
          {storeDetail.vouchers} vouchers
        </div>
      </div>
      <div onClick={handleClickUnfollow}>
        {isFollowed ? <StarIcon /> : <StarDisabledIcon />}
      </div>
      <div className="pr-4">
        <img
          className="w-[50px] h-[50px] rounded-full"
          src={storeDetail.sellerCoverImage}
        />
      </div>
    </div>
  );
}
