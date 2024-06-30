import React, { useEffect, useState } from "react";
import eventApi from "../apis/event";
import { MONTHS_NAME } from "../constants/date-constant";
import { PinIcon, PinIconActive } from "../icons";
import { getDayOfWeek } from "../utils/datetime-conversion";
import useStore from "../zustand/store.js";

export default function EventTabCard({
  selectedEventDetails,
  isFullVersion = true,
  hasVoucher = false,
}) {
  // Pin Status & Handle Click Pin
  const [isInterested, setIsInterested] = useState(false);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  console.log("selectedEventDetails in event card", selectedEventDetails);
  useEffect(() => {
    // Check current Interest Status of the event of this user
    setIsInterested(selectedEventDetails.interest);
  }, []);
  const handleClickPin = async (e) => {
    try {
      // 1. เช็คก่อนว่า Login รึยีง ถ้ายัง >> เด้ง error
      if (!isAuthenticated) {
        return alert("Please Login First");
      }
      // 2. ยิง API เพื่อ Update isInterested State Backend โดยระบุ eventId
      const result = await eventApi.toggleInterestEventById(
        selectedEventDetails.id
      );
      console.log("Result from API updating interest status", result);
      // 3. ถ้า update สำเร็จ >> setIsinterested เป็นอีกค่านึง ถ้าไม่สำเร็จ >> ส่ง error
      setIsInterested(!isInterested);
    } catch (err) {
      console.log("error from updating interest", err);
    }
  };
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

          {/* ถ้าเป็น event card แบบ full version - จะแสดงปุ่มกด interest แบบ full version แต่ถ้าไม่ใช่ full version (แสดง other events) จะแสดงแค่ pin ขึ้นมา*/}
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
        {/* ถ้าเป็น event card แบบ full version - จะแสดง event Details ด้วย*/}
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
