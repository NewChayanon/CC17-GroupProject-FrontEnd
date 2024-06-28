import React, { useState } from "react";
import { MONTHS_NAME } from "../constants/date-constant";
import { PinIcon, PinIconActive } from "../icons";
import { getDayOfWeek } from "../utils/datetime-conversion";

export default function EventTabCard({
  selectedEventDetails,
  isFullVersion = true,
  hasVoucher = false,
}) {
  // Pin Status & Handle Click Pin
  const [isInterested, setIsInterested] = useState(false);
  const handleClickPin = (e) => {
    setIsInterested(!isInterested);
    // ยิง API เพื่อ Update isInterested State BAckend
  };
  console.log("selectedEventDetails", selectedEventDetails);
  const eventStartDate = selectedEventDetails?.eventStartDate.split("/")[0];
  const eventStartMonth =
    MONTHS_NAME[selectedEventDetails?.eventStartDate.split("/")[1]];
  const eventStartDay = getDayOfWeek(selectedEventDetails?.eventStartDate);
  return (
    <div className={`flex rounded-lg ${isFullVersion ? "" : "shadow-xl p-2"}`}>
      <div className="flex flex-col gap-4">
        {isFullVersion && (
          <div className="text-xl font-bold">
            Event: {selectedEventDetails?.eventName}
          </div>
        )}
        <div className="flex gap-4 items-center">
          <div
            className="bg-graylighticon rounded-lg flex flex-col justify-center items-center"
            style={{ width: "50px", height: "50px" }}
          >
            <div className="text-sm font-semibold">{eventStartDate}</div>
            <div className="text-sm font-semibold text-graylighttext">
              {eventStartMonth}
            </div>
          </div>
          <div className="flex flex-col grow">
            <div className="text-sm font-semibold">{eventStartDay}</div>
            <div className="text-sm font-semibold text-graylighttext">
              10:00AM - 18:00PM
            </div>
          </div>
          {isFullVersion ? (
            <div onClick={handleClickPin}>
              {isInterested ? (
                <div className="flex gap-1 items-center bg-secondary py-1 px-2 rounded-lg text-sm text-primary">
                  Uninterested
                  <PinIconActive />
                </div>
              ) : (
                <div className="flex gap-1 items-center bg-graylighticon py-1 px-2 rounded-lg text-sm ">
                  I'm interested
                  <PinIcon />
                </div>
              )}
            </div>
          ) : (
            <div onClick={handleClickPin}>
              {isInterested ? <PinIconActive /> : <PinIcon />}
            </div>
          )}
        </div>
        <div className="text-sm text-primary font-semibold">
          Location: {selectedEventDetails?.eventLocation}
        </div>
        {isFullVersion && (
          <p
            className="text-sm text-graydarktext text-ellipsis overflow-hidden"
            style={{
              minHeight: "80px",
              maxHeight: "80px",
            }}
          >
            Lorem ipsum dolor sit Vivamus cursus elit vel ligula dapibus, vitae
            lacinia tortor consequat. Pellentesque ultrices tristique porttitor.
            Quisque elementum eros sagittis purus efficitur, am Lorem ipsum
            dolor sit Vivamus cursus elit vel ligula dapibus, vitae lacinia
            tortor consequat. Pellentesque ultrices tristique porttitor. Quisque
            elementum eros sagittis purus efficitur, am
          </p>
        )}
      </div>
    </div>
  );
}
