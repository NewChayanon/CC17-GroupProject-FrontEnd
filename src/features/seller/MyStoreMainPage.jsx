import { useState } from "react";
import { AnnouncementIcon, CalendarIcon, ProductIcon } from "../../icons";
import EventDetailTab from "./components/EventDetailTab";
import PromotionTab from "./components/PromotionTab";
import ProductTab from "./components/ProductTab";

export default function MyStoreMainPage() {
  const [slideUp, setSlideUp] = useState(false);
  const [activeMenu, setActiveMenu] = useState("detail");

  const handleSlideUp = () => {
    setSlideUp(!slideUp);
  };

  const handleClickMenu = (e) => {
    console.log(e.target);
    setActiveMenu(e.target.id);
  };

  return (
    <div className="relative bg-graybg min-h-full w-full flex flex-col justify-between overflow-hidden">
      {/* MAP GOES HERE IN THIS DIV BELOW */}
      <div></div>
      {/* MAP GOES HERE IN THIS DIV ABOVE */}
      <div
        className={`absolute flex flex-col gap-4 -bottom-[70%] xl:-bottom-[60%] bg-lightyellow h-[95%] w-full transition-transform duration-500 ${slideUp ? "-translate-y-[70%] xl:-translate-y-[60%]" : "translate-y-0"}`}
      >
        <div className="flex w-full p-4 gap-3">
          <div className="flex flex-col w-1/2 gap-2">
            <div>
              <p className="text-base font-bold">
                Event: Century Victory Monument
              </p>
              <p className="text-base font-bold">
                by <span className="text-darkgreen">Lovelove Durian</span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
                <p className="text-absoluteblack text-sm font-bold">12</p>
                <p className="text-graylighttext text-sm font-bold">May</p>
              </div>
              <div>
                <p className="text-sm text-absoluteblack font-bold">Thursday</p>
                <p className="text-xs text-graylighttext font-bold">
                  10:00AM - 18:00PM
                </p>
              </div>
            </div>
            <div className="w-full overflow-hidden h-6">
              <p className="text-darkgreen text-sm font-semibold text-ellipsis overflow-hidden">
                Location: Century Plaza Victory Monument
              </p>
            </div>
          </div>
          {/* MAP AND PICTURE GOES HERE IN THIS DIV BELOW */}
          <div className="bg-graybg w-1/2">MAP HERE</div>
          {/* MAP AND PICTURE GOES HERE IN THIS DIV ABOVE */}
        </div>
        <div className="h-full overflow-y-auto">
          <div className="flex w-full h-8 bg-primary">
            <div className="group flex w-1/3">
              <div
                className={`${
                  activeMenu === "detail"
                    ? "bg-graybg text-primary font-semibold rounded-tr-md"
                    : "bg-primary text-white rounded-tr-md group-hover:bg-darkgreen group-hover:text-graylighticon"
                } flex justify-center items-center grow font-bold text-sm gap-1 hover:cursor-pointer`}
                onClick={handleClickMenu}
                id="detail"
              >
                <CalendarIcon id="detail" fill={activeMenu === "detail"} />
                Event Detail
              </div>
            </div>
            <div className="group flex w-1/3">
              <div
                className={`${
                  activeMenu === "promotion"
                    ? "bg-graybg text-primary font-semibold rounded-tr-md"
                    : "bg-primary text-white rounded-tr-md group-hover:bg-darkgreen group-hover:text-graylighticon"
                } flex justify-center items-center grow font-bold text-sm gap-1 hover:cursor-pointer`}
                onClick={handleClickMenu}
                id="promotion"
              >
                <AnnouncementIcon
                  id="promotion"
                  fill={activeMenu === "promotion"}
                />
                Promotion
              </div>
            </div>
            <div className="group flex w-1/3">
              <div
                className={`${
                  activeMenu === "products"
                    ? "bg-graybg text-primary font-semibold rounded-tr-md"
                    : "bg-primary text-white rounded-tr-md group-hover:bg-darkgreen group-hover:text-graylighticon"
                } flex justify-center items-center grow font-bold text-sm gap-1 hover:cursor-pointer`}
                onClick={handleClickMenu}
                id="products"
              >
                <ProductIcon id="products" fill={activeMenu === "products"} />
                Products
              </div>
            </div>
          </div>
          <div className="bg-graybg p-4 h-4/5 overflow-y-auto">
            {activeMenu === "detail" && <EventDetailTab />}
            {activeMenu === "promotion" && <PromotionTab />}
            {activeMenu === "products" && <ProductTab />}
          </div>
        </div>
      </div>
      <div className="sticky px-4 py-2 flex bg-transparent justify-end">
        <button onClick={handleSlideUp}>
          <p className="text-darkgreen underline font-semibold text-sm">
            {slideUp ? "Hide full detail" : "View full detail"}
          </p>
        </button>
      </div>
    </div>
  );
}
