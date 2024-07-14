import eventMapMock from "../../../images/event-map-pic-mock.png";

export default function EventCardCreatedEvents({
  eventName,
  storeName,
  eventDate,
  eventDay,
  eventMonth,
  openTime,
  eventLocationName,
}) {
  return (
    <>
      <div className="flex bg-verylightyellow">
        <div className="p-5 w-full text-sm font-semibold flex flex-col">
          <div className="flex">
            <div>Event : </div>
            <div>&nbsp;{eventName}</div>
          </div>
          <div className="flex">
            <div>by </div>
            <div className="text-primary font-semibold">&nbsp;{storeName}</div>
          </div>
          <div className="p-3 flex gap-3">
            <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
              <p className="text-gray-800 text-sm font-bold">{eventDate}</p>
              <p className="text-graylighttext text-sm font-bold">
                {eventMonth}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <div>{eventDay}</div>
              <div className="text-xs">{openTime}</div>
            </div>
          </div>
          <div className="flex text-primary">
            <div>Location: </div>
            <div> &nbsp;{eventLocationName}</div>
          </div>
        </div>
        <div className="p-6 w-full flex justify-center">
          <div className="flex">
            <img
              src={eventMapMock}
              alt="Event Map Mock"
              className="w-full h-full bg-verylightyellow"
            />
          </div>
        </div>
      </div>
    </>
  );
}
