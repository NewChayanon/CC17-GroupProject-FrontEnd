import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import eventApi from "../../apis/event";
import EventTabCard from "../../components/EventTabCard";
import useStore from "../../zustand/store";
import EventLocationPhoto from "./EventLocationPhoto";

export default function EventDetail() {
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
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isLoading = useStore((state) => state.isLoading);
  useEffect(() => {
    setSelectedEventDetails(eventIdfromPath, isAuthenticated);
    setEventId(eventIdfromPath);
  }, []);

  return (
    <div>
      {/* ============ EventDetail Event Details ============ */}
      <div className="flex justify-center p-6 bg-white">
        {!isLoading && selectedEventDetails && (
          <EventTabCard selectedEventDetails={selectedEventDetails} />
        )}
      </div>
      {/* Photos of the Location */}

      <div className="bg-secondary" style={{ height: "250px" }}>
        {/* <EventLocationPhoto
          latitude={selectedEventDetails?.eventLocation.split(",")[0]}
          longitude={selectedEventDetails?.eventLocation.split(",")[1]}
        /> */}
      </div>
      {/* ============ Other Events List============ */}
      <div className="flex flex-col p-6">
        <div className="text-xl font-bold">Other Events from this seller</div>
        <div>
          {selectedEventDetails &&
            selectedEventDetails.eventOther.map((otherEvent) => (
              <EventTabCard
                selectedEventDetails={otherEvent}
                isFullVersion={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
