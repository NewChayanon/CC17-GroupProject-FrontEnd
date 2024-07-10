/* eslint-disable react/prop-types */
import { DeleteIcon, EditIcon, MapPinIcon } from "../../../icons";

export default function EventSideBarCard({
  startDate,
  startMonth,
  endDate,
  openTime,
  location,
  closingTime,
  onClick,
  onClickEdit,
}) {
  return (
    <div
      onClick={onClick}
      className="flex gap-2.5 w-full max-w-96 p-2 items-center rounded-lg hover:cursor-pointer hover:bg-gray-50"
    >
      <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
        <p className="text-absoluteblack text-sm font-bold">{startDate}</p>
        <p className="text-graylighttext text-sm font-bold">{startMonth}</p>
      </div>
      <div className="flex justify-between w-4/5">
        <div className="flex flex-col">
          <p className="text-graylighttext text-[8px] font-bold">
            until {endDate}
          </p>
          <p className="text-absoluteblack text-xs font-bold">
            {openTime} - {closingTime}
          </p>
          <div className="flex gap-0.5 items-center">
            <MapPinIcon />
            <p className="text-graylighttext text-[8px] font-bold">
              {location}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClickEdit();
            }}
          >
            <EditIcon />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked");
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
