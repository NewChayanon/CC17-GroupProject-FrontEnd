import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import PlaseLoginCard from "../../components/PlaseLoginCard";
import { ReportSellerIcon } from "../../icons";
import useStore from "../../zustand/store";
import ReportForm from "./ReportForm";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function Review() {
  // get store ID and get store data from API
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(false); // {/* State for modal in case if user can get voucher */}
  const [openLoginModal, setOpenLoginModal] = useState(false); // {/* State for modal in case if user has not logged in yet */}
  const [openReportModal, setOpenReportModal] = useState(false); // {/* State for modal in case if user has not logged in yet */}

  // Call API to get all store details - async await & keep data in state
  const setStoreId = useStore((state) => state.setStoreId);
  const storeId = useStore((state) => state.storeId);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isLoading = useStore((state) => state.isLoading);
  const storeIdfromPath = pathname.split("/")[2];
  console.log("store ID from path", storeIdfromPath);
  const selectedStoreDetails = useStore((state) => state.selectedStoreDetails);
  const setSelectedStoreDetails = useStore(
    (state) => state.setSelectedStoreDetails
  );
  useEffect(() => {
    setSelectedStoreDetails(storeIdfromPath, isAuthenticated);
    setStoreId(storeIdfromPath);
  }, []);
  const handleClickWriteReview = (e) => {
    if (!isAuthenticated) {
      return setOpenLoginModal(true);
    }
    setOpenModal(true);
    console.log("Adding a review");
  };
  const handleClickReportSeller = (e) => {
    // redirect to a different page
    if (!isAuthenticated) {
      return setOpenReportModal(true);
    }
    setOpenReportModal(true);
    console.log("Reporting");
  };
  // const reviewArray = selectedStoreDetails.review
  return (
    <div className="flex flex-col bg-white">
      {selectedStoreDetails ? (
        <>
          <div className="flex justify-between items-center mx-6 mt-6">
            <div className=" text-primary text-xl">Review from Buyers</div>
            <div
              onClick={handleClickWriteReview}
              className="text-primary text-base underline underline-offset-2"
            >
              {" "}
              Write a review
            </div>
          </div>

          <div>
            {selectedStoreDetails.review.map((review, index) => (
              <ReviewCard review={review} key={index} id={index} />
            ))}
          </div>

          <div
            className="mx-6 my-4 flex items-center gap-2"
            onClick={handleClickReportSeller}
          >
            <ReportSellerIcon />
            <div>report this seller</div>
          </div>

          <Modal
            width="small"
            title="Write Your Review"
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
            <ReviewForm />
          </Modal>

          <Modal
            width="small"
            title="Share with us what happened to you!"
            open={openReportModal}
            onClose={() => setOpenReportModal(false)}
          >
            <ReportForm storeId={storeId} />
          </Modal>

          <Modal
            width="small"
            title="Please Log-in to use the app features"
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}
          >
            <PlaseLoginCard onClose={() => setOpenLoginModal(false)} />
          </Modal>
        </>
      ) : (
        <div>No data for this event</div>
      )}
    </div>
  );
}
