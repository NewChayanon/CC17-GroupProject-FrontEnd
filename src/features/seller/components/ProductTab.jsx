import { useEffect } from "react";
import useStore from "../../../zustand/store";
import SmallProductTabCard from "./SmallProductTabCard";
import Modal from "../../../components/Modal";
import AddMoreEventProduct from "./AddMoreEventProduct";
import { useState } from "react";

export default function ProductTab() {
  const selectedEvent = useStore((state) => state.selectedEvent);
  const { product } = selectedEvent;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {product.length >= 1 ? (
        product.map((el) => (
          <SmallProductTabCard
            key={el.productId}
            productImage={el.productImage}
            productName={el.productName}
            productDescription={el.productDescription}
            productPrice={el.productPrice}
            productUnit={el.productUnit}
          />
        ))
      ) : (
        <div>
          <p>This event has no product yet.</p>
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="border-darkgreen border-2 rounded-lg px-4 py-2 text-darkgreen font-semibold text-sm hover:border-darkbrown hover:text-darkbrown"
        >
          Add product to this event
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddMoreEventProduct />
      </Modal>
    </div>
  );
}
