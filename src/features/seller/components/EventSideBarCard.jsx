import { DeleteIcon, EditIcon, MapPinIcon } from "../../../icons";

export default function EventSideBarCard({
  startDate,
  startMonth,
  endDate,
  openTime,
  location,
}) {
  return (
    <div className="flex gap-2.5 w-full max-w-96 p-2 items-center">
      <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
        <p className="text-absoluteblack text-sm font-bold">{startDate}</p>
        <p className="text-graylighttext text-sm font-bold">{startMonth}</p>
      </div>
      <div className="flex justify-between w-4/5">
        <div className="flex flex-col">
          <p className="text-graylighttext text-[8px] font-bold">
            until {endDate}
          </p>
          <p className="text-absoluteblack text-xs font-bold">{openTime}</p>
          <div className="flex gap-0.5 items-center">
            <MapPinIcon />
            <p className="text-graylighttext text-[8px] font-bold">
              {location}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
