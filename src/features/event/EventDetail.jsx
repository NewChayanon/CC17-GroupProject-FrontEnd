import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import eventApi from "../../apis/event";
import EventMap from "../../components/EventMap";
import EventTabCard from "../../components/EventTabCard";
import useStore from "../../zustand/store";

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
  console.log("selectedEventDetails", selectedEventDetails);
  useEffect(() => {
    setSelectedEventDetails(eventIdfromPath, isAuthenticated);
    setEventId(eventIdfromPath);
    // const eventLatLng = {};
    // eventLatLng.lat = +selectedEventDetails.eventLocation.split(",")[0];
    // eventLocation.lng = +selectedEventDetails.eventLocation.split(",")[1];
    // console.log("Lat Long for this event", eventLatLng);
  }, []);

  return (
    <div className="bg-white">
      {selectedEventDetails && (
        <>
          {/* ============ EventDetail Event Details ============ */}
          <div className="flex justify-center p-6 bg-white">
            {!isLoading && selectedEventDetails && (
              <EventTabCard selectedEventDetails={selectedEventDetails} />
            )}
          </div>
          {/* Map of the event */}
          <EventMap eventLocation={{ lat: 13.7649, lng: 100.538 }} />
          {/* ============ Other Events List============ */}
          <div className="flex flex-col p-6">
            <div className="text-xl font-bold">
              Other Events from this seller
            </div>
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
        </>
      )}
    </div>
  );
}
