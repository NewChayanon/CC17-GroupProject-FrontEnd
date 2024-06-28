import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CouponTab from "./CouponTab";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import eventApi from "../../apis/event";
import EventTabCard from "../../components/EventTabCard";
import useStore from "../../zustand/store";

export default function Promotion() {
  const { pathname } = useLocation();
  // Call API to get all event details - async await & keep data in state
  const setEventId = useStore((state) => state.setEventId);
  const eventId = useStore((state) => state.eventId);
  const eventIdfromPath = pathname.split("/")[2];
  setEventId(eventIdfromPath);
  const selectedEventDetails = useStore((state) => state.selectedEventDetails); // ข้อมูลมา
  const setSelectedEventDetails = useStore(
    (state) => state.setSelectedEventDetails
  );
  useEffect(() => {
    setSelectedEventDetails(eventId);
  }, []);
  const handleOpenVoucher = (e) => {};
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 justify-center p-6 bg-white">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-primary">
            Special deal from this store!
          </div>
          <div className="text-base">
            Early bird customers who liked our LINE Official store get 20%Off
            for the first time.
          </div>
          <div>
            <div className="text-base font-semibold">Conditions</div>
            <div>
              This promotion is valid until 31st December 2024. One Line user
              can use only 1 time.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-primary">
            Coupon for this event!
          </div>
          <CouponTab />
          <Button onClick={handleOpenVoucher}>Get this coupon!</Button>
          <Modal modalID={1} callToAction="Open Modal">
            Get This Coupon
          </Modal>
        </div>
      </div>
    </div>
  );
}
