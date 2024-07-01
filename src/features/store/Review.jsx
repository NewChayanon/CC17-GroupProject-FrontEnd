import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../zustand/store";
import ReviewCard from "./ReviewCard";

export default function Review() {
    // get store ID and get store data from API
    const { pathname } = useLocation();
    // Call API to get all store details - async await & keep data in state
    const setStoreId = useStore((state) => state.setStoreId);
    const storeId = useStore((state) => state.storeId);
    const isAuthenticated = useStore((state)=>state.isAuthenticated)
    const storeIdfromPath = pathname.split("/")[2];
    setStoreId(storeIdfromPath)
    console.log("store ID from path", storeIdfromPath);
  const selectedStoreDetails = useStore((state)=>state.selectedStoreDetails)
  const setSelectedStoreDetails = useStore((state)=> state.setSelectedStoreDetails)
    useEffect(() => {
      setSelectedStoreDetails(storeIdfromPath,isAuthenticated);
    }, []);
  const reviewArray = selectedStoreDetails.review
  return (
    <div className="flex flex-col bg-white">
      <div className="mx-6 mt-6 text-primary text-xl">Review from Buyers</div>
      <div>
        {reviewArray.map((review, index) => (
          <ReviewCard review={review} key={index} id={index} />
        ))}
      </div>
    </div>
  );
}
