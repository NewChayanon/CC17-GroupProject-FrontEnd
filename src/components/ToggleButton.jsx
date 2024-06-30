import { useState } from "react";
import { StarDisabledIcon, StarIcon } from "../icons";

export default function ToggleButton({
  onClick,
  activeStateWord,
  inactiveStateWord,
  activeStateIcon,
  inactiveStateIcon,
}) {
  // Pin Status & Handle Click Pin
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (e) => {
    /// 1. Check ก่อนว่า login อยู่มั้ย ถ้าไม่ >> modal popup ว่ายังไม่มี
    /// 2. ถ้า Login แล้ว ให้ toggle
    setIsClicked(!isClicked);
  };
  return (
    <div className="" onClick={handleClick}>
      {isClicked ? (
        <div className="flex items-center gap-1 items-center bg-secondary py-1 px-4 rounded-full text-sm text-primary">
          {activeStateWord}
          {activeStateIcon}
        </div>
      ) : (
        <div className="flex items-center gap-1 items-center bg-graylighticon py-1 px-4 rounded-full text-sm ">
          {inactiveStateWord}
          {inactiveStateIcon}
        </div>
      )}
    </div>
  );
}
