import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCover from "../features/event/EventCover";
import { AnnouncementIcon, ProductIcon } from "../icons";
import { CalendarIcon } from "../icons/calendar-icon";

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
      <div className="flex w-full h-8 bg-primary relative">
        <div
          className={`${
            activeMenu === "detail"
              ? "bg-white text-primary font-semibold rounded-tr-md"
              : "bg-primary text-white"
          } flex justify-center items-center gap-1 grow hover:cursor-pointer`}
          onClick={handleClickMenu}
          id="detail"
        >
          <CalendarIcon
            id="detail"
            fill={activeMenu === "detail" ? true : false}
          />
          <div id="detail">Event Detail</div>
        </div>
        <div
          className={`${
            activeMenu === "promotion"
              ? "bg-white text-primary font-semibold rounded-tr-md"
              : "bg-primary text-white"
          } flex justify-center items-center gap-1 grow hover:cursor-pointer`}
          onClick={handleClickMenu}
          id="promotion"
        >
          <AnnouncementIcon
            id="promotion"
            fill={activeMenu === "promotion" ? true : false}
          />
          <div id="promotion">Promotion</div>
        </div>
        <div
          className={`${
            activeMenu === "products"
              ? "bg-white text-primary font-semibold rounded-tr-md"
              : "bg-primary text-white"
          } flex justify-center items-center gap-1 grow hover:cursor-pointer`}
          onClick={handleClickMenu}
          id="products"
        >
          <ProductIcon
            id="products"
            fill={activeMenu === "products" ? true : false}
          />
          <div id="products">Products</div>
        </div>
      </div>
    </div>
  );
}
