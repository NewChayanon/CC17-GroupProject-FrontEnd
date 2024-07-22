import mapMock from "../../../images/mapmock-seller.png";
import SellerMap from "../map/sellerMap";

export default function EventCardCreatedEvents({
  eventName,
  storeProfileName,
  eventDate,
  eventDay,
  eventMonth,
  eventStartDate,
  eventLocation,
  eventPosition,
}) {
  return (
    <>
      <div className="flex bg-verylightyellow">
        <div className="p-5 w-full font-semibold text-base flex flex-col">
          <div className="flex">
            <div>Event: </div>
            <div className="text-ellipsis overflow-hidden h-6">
              &nbsp;{eventName}
            </div>
          </div>
          <div className="flex text-base items-center">
            <div>by </div>
            <div className="text-primary text-lg font-semibold">
              &nbsp;{storeProfileName}
            </div>
          </div>
          <div className="p-3 flex gap-3">
            <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
              <p className="text-gray-800 text-sm font-bold">{eventDate}</p>
              <p className="text-graylighttext text-sm font-bold">
                {eventMonth}
              </p>
            </div>
            <div className="flex flex-col justify-center text-base">
              <div>{eventDay}</div>
              <div className="text-sm">{eventStartDate.split("T")[0]}</div>
            </div>
          </div>
          <div className="flex text-primary">
            <div>Location: </div>
            <div> &nbsp;{eventLocation}</div>
          </div>
        </div>
        <div className="p-6 w-full flex justify-end">
          <div className="w-4/5 h-[140px]">
            <SellerMap
              showSearchBar={false}
              height="small"
              givenPosition={eventPosition}
              showOtherEvent={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
