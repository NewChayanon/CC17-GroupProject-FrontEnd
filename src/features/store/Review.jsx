import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import PlaseLoginCard from "../../components/PlaseLoginCard";
import useStore from "../../zustand/store";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function Review() {
    // get store ID and get store data from API
    const { pathname } = useLocation();
    const [openModal,setOpenModal] = useState(false) // {/* State for modal in case if user can get voucher */}
  const [openLoginModal,setOpenLoginModal] = useState(false) // {/* State for modal in case if user has not logged in yet */}
  
    // Call API to get all store details - async await & keep data in state
    const setStoreId = useStore((state) => state.setStoreId);
    const storeId = useStore((state) => state.storeId);
    const isAuthenticated = useStore((state)=>state.isAuthenticated)
    const isLoading = useStore((state)=>state.isLoading)
    const storeIdfromPath = pathname.split("/")[2];
    console.log("store ID from path", storeIdfromPath);
  const selectedStoreDetails = useStore((state)=>state.selectedStoreDetails)
  const setSelectedStoreDetails = useStore((state)=> state.setSelectedStoreDetails)
    useEffect(() => {
      setSelectedStoreDetails(storeIdfromPath,isAuthenticated);
      setStoreId(storeIdfromPath)
    }, []);
    const handleClickWriteReview = (e) => {
      if (!isAuthenticated) {
        return setOpenLoginModal(true)
      }
      setOpenModal(true)
      console.log("Adding a review")
    }
  const reviewArray = selectedStoreDetails.review
  return ( 
    <div className="flex flex-col bg-white">
      <div className="flex justify-between items-center bg-red-100  mx-6 mt-6">
        <div className=" text-primary text-xl">Review from Buyers</div>
        <div onClick={handleClickWriteReview} className="text-primary text-base underline underline-offset-2"> Write a review</div>
      </div>
      <div>
        {reviewArray.map((review, index) => (
          <ReviewCard review={review} key={index} id={index} />
        ))}
      </div>
      {/* ======== Modal ให้เขียน Review */}
      <Modal  width="small"
            title="Write Your Review"
            open={openModal}
            onClose={() => setOpenModal(false)}>
           <ReviewForm/>
            </Modal>
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
