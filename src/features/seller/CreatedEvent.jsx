import Button from "../../components/Button";
import EventCardCreatedEvents from "./components/EventCardCreatedEvents";
import useStore from "../../zustand/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatedEvent() {
  const navigate = useNavigate();
  const getCreatedEvents = useStore((state) => state.getCreatedEvents);
  const getMyStore = useStore((state) => state.getMyStore);
  const eventInfo = useStore((state) => state.eventInfo);
  const getWeekday = useStore((state) => state.getWeekday);
  const formatMonth = useStore((state) => state.formatMonth);

  useEffect(() => {
    const fetchdata = async () => {
      await getMyStore();
      await getCreatedEvents();
    };
    fetchdata();
  }, []);

  return (
    <div className="flex flex-wrap w-full bg-graybg">
      <div className="flex flex-col p-9 gap-3 w-full h-auto bg-graybg">
        <div className="flex justify-between px-3">
          <div className="text-primary text-2xl font-bold pb-5">
            Created Event List
          </div>
          <div>
            <Button onClick={() => navigate("/mystore/create-new-event")}>
              Create New Event
            </Button>
          </div>
        </div>
        {eventInfo && (
          <div className="flex flex-col gap-3">
            {eventInfo.map((el) => (
              <EventCardCreatedEvents
                key={el.eventId}
                eventName={el.eventName}
                storeProfileName={el.storeProfileName}
                eventDate={new Date(el.eventStartDate).getUTCDate()}
                eventDay={getWeekday(el.eventStartDate)}
                eventMonth={formatMonth(el.eventStartDate)}
                eventStartDate={el.eventStartDate}
                eventLocation={el.locationName}
                eventImage={el.eventImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
