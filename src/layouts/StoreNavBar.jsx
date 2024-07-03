import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import StoreFullCard from "../components/StoreFullCard";
import MyStoreContainer from "../features/seller/MyStoreContainer";
import StoreCover from "../features/store/StoreCover";
import { useEffect } from "react";
import { useState } from "react";

export default function StoreNavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);
  const storeIdfromPath = pathname.split("/")[2];
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setStoreId = useStore((state) => state.setStoreId);
  const selectedStoreDetails = useStore((state) => state.selectedStoreDetails);
  const setSelectedStoreDetails = useStore(
    (state) => state.setSelectedStoreDetails
  );
  setStoreId(storeIdfromPath);
  useEffect(() => {
    console.log(
      "In store navbar use effect - calling setSelectedStore details"
    ); // ตรงนี้รันปกติ
    setSelectedStoreDetails(storeIdfromPath, isAuthenticated);
  }, []);

  useEffect(() => {
    console.log(
      "In store navbar use effect - calling setIsFollow status" // ตรงนี้รันปกติ
    );
    // ควรจะ fetch ขึ้นมารอบแรก แต่ไม่ขึ้น ทำให้ .follow แล้วระเบิด >> ตั้งแต่บรรทัดนี้ไม่รัน เพราะว่าต่า setSelecedStoreDetail น่าจะยังไม่มา
    console.log(
      "In store navbar use effect - checking if store details is available",
      setSelectedStoreDetails.followed
    ); // ตรงนี้ไม่รัน
    if (!isAuthenticated || !setSelectedStoreDetails.followed) return;
    console.log("In use effect - follow status", selectedStoreDetails.followed);
    setIsFollowed((prev) => selectedStoreDetails.followed);
  }, []);
  console.log("Final Follow status", isFollowed);

  const activeMenu = pathname.split("/")[3];
  const handleClickMenu = (e) => {
    console.log("Store id", e.target.id);
    navigate(`../store/${storeIdfromPath}/${e.target.id}`);
  };
  return (
    <div>
      {selectedStoreDetails && (
        <StoreCover selectedStoreDetails={selectedStoreDetails} />
      )}
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
      {selectedStoreDetails && (
        <StoreFullCard
          selectedStoreDetails={selectedStoreDetails}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
      )}
    </div>
  );
}
