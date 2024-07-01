import { useLocation, useNavigate } from "react-router-dom";
import StoreFullCard from "../components/StoreFullCard";
import SellerContainer from "../features/seller/SellerContainer";
import StoreCover from "../features/store/StoreCover";

export default function StoreNavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const storeIdfromPath = pathname.split("/")[2];
  // 1. ต้องยิิง API เรียก store details มาโชว์ (cover photo, sellerProfile โดยใช้ storeId )

  const activeMenu = pathname.split("/")[3];
  const handleClickMenu = (e) => {
    console.log("Store id", e.target.id);
    navigate(`../store/${storeIdfromPath}/${e.target.id}`);
  };
  return (
    <div>
      <StoreCover />
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
      <StoreFullCard />
    </div>
  );
}
