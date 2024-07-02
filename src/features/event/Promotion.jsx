import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CouponTab from "./CouponTab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import eventApi from "../../apis/event";
import EventTabCard from "../../components/EventTabCard";
import useStore from "../../zustand/store";
import CouponDetailModal from "./CouponDetailModal";
import PlaseLoginCard from "../../components/PlaseLoginCard";

export default function Promotion() {
  const { pathname } = useLocation();
  const [openModal,setOpenModal] = useState(false) // {/* State for modal in case if user can get voucher */}
  const [openLoginModal,setOpenLoginModal] = useState(false) // {/* State for modal in case if user has not logged in yet */}
  // Call API to get all event details - async await & keep data in state
  const setEventId = useStore((state) => state.setEventId);
  const eventId = useStore((state) => state.eventId);
  const eventIdfromPath = pathname.split("/")[2];
  
  const isAuthenticated = useStore((state)=>state.isAuthenticated)
  const isLoading = useStore((state)=>state.isLoading)
  const selectedEventDetails = useStore((state) => state.selectedEventDetails); // ข้อมูลมา
  const setSelectedEventDetails = useStore(
    (state) => state.setSelectedEventDetails
  );
  useEffect(() => {
    setSelectedEventDetails(eventIdfromPath,isAuthenticated);
    setEventId(eventIdfromPath);
  }, []);
  const handleGetCoupon = async (e) => {
    try{
    // 1. check ว่า login แล้วหรือยัง ถ้ายังไม่ login จะ get coupon ไม่ได้
    if (!isAuthenticated) {
      return setOpenLoginModal(true)
    }
// 2. ถ้า login แล้ว >> ยิง API เพื่อไปขอ get coupon มาจาก Backend ถ้าสำเร็จ ให้เปิด modal เพื่อแสดง voucher
const result = await eventApi.getCoupon(eventId)
console.log("Result from getting coupon", result)
setOpenModal(true)
} catch(err){console.log("error from API to get coupon",err)}
  }
  
  return (
    <div className="flex flex-col">
      {/* === Check if this event provides coupon or not === */}
      {!isLoading&& selectedEventDetails?.voucherItem ? (
        <div className="flex flex-col gap-4 justify-center p-6 bg-white">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-primary">
              Special deal from this store!
            </div>
            <div className="text-sm">
            {selectedEventDetails?.voucherItem.voucherCondition}
            </div>
            <div>
              <div className="text-sm font-semibold">Conditions</div>
              <div className="text-sm">
              {selectedEventDetails?.voucherItem.voucherCondition}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-xl font-bold text-primary">
              Coupon for this event!
            </div>
            <CouponTab selectedEventDetails={selectedEventDetails} />
            {/* Check if user already has coupon OR if coupon has run-out >> then disable the button */}
            <div className="self-center">
            {selectedEventDetails.voucherItem.userVoucherStatus[0]||selectedEventDetails.voucherItem.voucherRemainingAmount<=0
            ?<Button onClick={handleGetCoupon} disabled={true} bg="ghost" color="ghost">Get Coupon</Button>
            :<Button onClick={handleGetCoupon} disabled={false}>Get Coupon</Button>}
            </div>
    
            {/* Modal if user login and get coupon successfully */}
           <Modal  width="small"
            title="This coupon is collected!"
            open={openModal}
            onClose={() => setOpenModal(false)}>
            <CouponDetailModal selectedEventDetails={selectedEventDetails} onCloseModal={() => setOpenModal(false)}/>
            </Modal>
             {/* Modal if user has not logged in yet */}
            <Modal width="small"
            title="Please Log-in to use the app features"
            open={openLoginModal}
            onClose={() => setOpenLoginModal(false)}>
          <PlaseLoginCard onClose={() => setOpenLoginModal(false)}/>
            </Modal>
          </div>
        </div>
      ) : (
        <div>No Voucher For this event</div>
      )}
    </div>
  );
}
