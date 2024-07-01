import ProductTabCard from "../../components/ProductTabCard";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../../zustand/store";

export default function Product() {
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
  return (
    selectedEventDetails && (
      <div className="m-6 flex flex-col gap-4">
        {selectedEventDetails?.eventList.map((product) => (
          <ProductTabCard product={product} />
        ))}
      </div>
    )
  );
}
