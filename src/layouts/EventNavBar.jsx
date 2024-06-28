import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCover from "../features/event/EventCover";

export default function EventNavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const eventIdfromPath = pathname.split("/")[2];
  const activeMenu = pathname.split("/")[3];
  const handleClickMenu = (e) => {
    console.log("Event Name", e.target.id);
    navigate(`../event/${eventIdfromPath}/${e.target.id}`);
  };
  return (
    <div>
      <EventCover />
      {/* ============ EventDetail Menu Bar ============ */}
      <div className="flex w-full h-8 bg-primary">
        <div
          className={`${
            activeMenu === "detail"
              ? "bg-white text-primary font-semibold rounded-t-md"
              : "bg-primary text-white"
          } flex justify-center items-center grow`}
          onClick={handleClickMenu}
          id="detail"
        >
          Event Detail
        </div>
        <div
          className={`${
            activeMenu === "promotion"
              ? "bg-white text-primary font-semibold rounded-t-md"
              : "bg-primary text-white"
          } flex justify-center items-center grow`}
          onClick={handleClickMenu}
          id="promotion"
        >
          Promotion
        </div>
        <div
          className={`${
            activeMenu === "products"
              ? "bg-white text-primary font-semibold rounded-t-md"
              : "bg-primary text-white"
          } flex justify-center items-center grow`}
          onClick={handleClickMenu}
          id="products"
        >
          Products
        </div>
      </div>
    </div>
  );
}
