import { DeleteIcon, EditIcon, MapPinIcon } from "../../../icons";

export default function EventSideBarCard() {
  return (
    <div className="flex gap-2.5 w-full max-w-96 p-2 items-center">
      <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
        <p className="text-absoluteblack text-sm font-bold">12</p>
        <p className="text-graylighttext text-sm font-bold">May</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <p className="text-graylighttext text-[8px] font-bold">
            until 16 May 2024
          </p>
          <p className="text-absoluteblack text-xs font-bold">
            10:00AM - 18:00PM
          </p>
          <div className="flex gap-0.5 items-center">
            <MapPinIcon />
            <p className="text-graylighttext text-[8px] font-bold">
              Siam Center, Bangkok
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
