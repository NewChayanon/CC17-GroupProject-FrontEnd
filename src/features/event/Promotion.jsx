import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CouponTab from "./CouponTab";

export default function Promotion() {
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
            This coupon is Collected!
          </Modal>
        </div>
      </div>
    </div>
  );
}
