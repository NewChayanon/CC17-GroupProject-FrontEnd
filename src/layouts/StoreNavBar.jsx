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
  // Fetch store data from API
  useEffect(() => {
    setSelectedStoreDetails(storeIdfromPath, isAuthenticated);
  }, []);
  // Update "isfollow" state of each user/each store to render
  useEffect(() => {
    if (!isAuthenticated || !selectedStoreDetails?.followed) return;
    setIsFollowed(selectedStoreDetails.followed);
  }, [selectedStoreDetails]);

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
