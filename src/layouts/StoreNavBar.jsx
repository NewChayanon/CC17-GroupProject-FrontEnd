import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import StoreFullCard from "../components/StoreFullCard";
import SellerContainer from "../features/seller/SellerContainer";
import StoreCover from "../features/store/StoreCover";
import { useEffect } from "react";
import { useState } from "react";

export default function StoreNavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isFollowed,setIsFollowed] = useState(false)
  const storeIdfromPath = pathname.split("/")[2];
  // 1. ต้องยิิง API เรียก store details มาโชว์ (cover photo, sellerProfile โดยใช้ storeId )
  console.log("store ID from path", storeIdfromPath);
  const isAuthenticated = useStore((state)=>state.isAuthenticated)
  const setStoreId = useStore((state) => state.setStoreId);
  const selectedStoreDetails = useStore((state)=>state.selectedStoreDetails)
  const setSelectedStoreDetails = useStore((state)=> state.setSelectedStoreDetails)
  setStoreId(storeIdfromPath)
    useEffect(() => {
      setSelectedStoreDetails(storeIdfromPath,isAuthenticated);
    }, []);
    useEffect(()=>{
      // ควรจะ fetch ขึ้นมารอบแรก แต่ไม่ขึ้น ทำให้ .follow แล้วระเบิด
      if(!isAuthenticated || !setSelectedStoreDetails.followed ) return 
        console.log("In useeffect - follow status", selectedStoreDetails.followed)
        setIsFollowed(selectedStoreDetails.followed)
     
    },[]) 

  const activeMenu = pathname.split("/")[3];
  const handleClickMenu = (e) => {
    console.log("Store id", e.target.id);
    navigate(`../store/${storeIdfromPath}/${e.target.id}`);
  };
  return ( 
  <div>
     {selectedStoreDetails&&<StoreCover selectedStoreDetails={selectedStoreDetails} />}
      {/* ============ Shop Nav Bar ============ */}
      <div className="flex w-full h-8 bg-primary">
        <div className="w-1/3 bg-primary flex justify-center items-center grow"></div>
        <div
          className={`${
            activeMenu === "profile"
              ? "bg-white text-primary font-semibold rounded-t-md"
              : "bg-primary text-white"
          } w-1/3 flex justify-center items-center grow`}
          onClick={handleClickMenu}
          id="profile"
        >
          Store Profile
        </div>
        <div
          className={`${
            activeMenu === "review"
              ? "bg-white text-primary font-semibold rounded-t-md"
              : "bg-primary text-white"
          } w-1/3 flex justify-center items-center grow`}
          onClick={handleClickMenu}
          id="review"
        >
          Review
        </div>
      </div>
      {/* ============ Shop Profile ============ */}
      {selectedStoreDetails&&<StoreFullCard selectedStoreDetails={selectedStoreDetails} isFollowed={isFollowed} setIsFollowed={setIsFollowed} />}
    </div>
  );
}
