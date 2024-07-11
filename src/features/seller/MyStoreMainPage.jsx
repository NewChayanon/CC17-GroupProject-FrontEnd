import { useState } from "react";
import { AnnouncementIcon, CalendarIcon, ProductIcon } from "../../icons";
import EventDetailTab from "./components/EventDetailTab";
import PromotionTab from "./components/PromotionTab";
import ProductTab from "./components/ProductTab";
import useStore from "../../zustand/store";
import { useEffect } from "react";
import { useRef } from "react";
import SellerMap from "./map/sellerMap";

export default function MyStoreMainPage() {
  const [activeMenu, setActiveMenu] = useState("detail");
  const slideUp = useStore((state) => state.slideUp);
  const setSlideUp = useStore((state) => state.setSlideUp);
  const showText = useStore((state) => state.showText);
  const setShowText = useStore((state) => state.setShowText);
  const getMyStore = useStore((state) => state.getMyStore);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const storeDetail = useStore((state) => state.storeDetail);
  const selectedEvent = useStore((state) => state.selectedEvent);
  const formatMonth = useStore((state) => state.formatMonth);
  const getWeekday = useStore((state) => state.getWeekday);
  const convertTime = useStore((state) => state.convertTime);
  const redirectEdit = useStore((state) => state.redirectEdit);
  const setRedirectEdit = useStore((state) => state.setRedirectEdit);
  const { myStoreProfile } = storeDetail;

  const timeoutRef = useRef(null);

  const handleSlideUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowText(true);
    setSlideUp(true);
  };

  const handleSlideDown = () => {
    setSlideUp(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowText(false);
    }, 500);
  };

  const handleClickMenu = (e) => {
    setActiveMenu(e.target.id);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getMyStore();
      if (res.myStoreProfile) {
        if (res.myStoreProfile.eventNow.length > 0) {
          setSelectedEvent(res.myStoreProfile.eventNow[0]);
        } else if (res.myStoreProfile.upComingEvent.length > 0) {
          setSelectedEvent(res.myStoreProfile.eventNow[0]);
        } else return;
      }
    };
    if (redirectEdit === false) fetchdata();
    else if (redirectEdit === true) setRedirectEdit(false);
  }, []);

  return (
    <div className="relative bg-graybg min-h-full w-full flex flex-col justify-between overflow-hidden">
      <SellerMap />

      {selectedEvent && myStoreProfile ? (
        <>
          <div
            className={`absolute flex flex-col gap-4 -bottom-[70%] xl:-bottom-[65%] 2xl:-bottom-[70%] bg-verylightyellow h-[95%] w-full transition-transform duration-500 ${slideUp ? "-translate-y-[70%] xl:-translate-y-[65%] 2xl:-translate-y-[70%]" : "translate-y-0"}`}
          >
            <div className="flex w-full p-4 gap-3">
              <div className="flex flex-col w-1/2 gap-2">
                <div>
                  <p className="text-base font-bold">
                    Event: {selectedEvent.eventName}
                  </p>
                  <p className="text-base font-bold">
                    by{" "}
                    <span className="text-darkgreen">
                      {myStoreProfile.storeName}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
                    <p className="text-absoluteblack text-sm font-bold">
                      {new Date(selectedEvent.eventStartDate).getUTCDate()}
                    </p>
                    <p className="text-graylighttext text-sm font-bold">
                      {formatMonth(selectedEvent.eventStartDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-absoluteblack font-bold">
                      {getWeekday(selectedEvent.eventStartDate)}
                    </p>
                    <p className="text-xs text-graylighttext font-bold">
                      {convertTime(
                        selectedEvent.openTime
                          .split("T")[1]
                          .split(":00.000Z")[0]
                      )}{" "}
                      -{" "}
                      {convertTime(
                        selectedEvent.closingTime
                          .split("T")[1]
                          .split(":00.000Z")[0]
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-full overflow-hidden h-6">
                  <p className="text-darkgreen text-sm font-semibold text-ellipsis overflow-hidden">
                    Location: {selectedEvent.eventLocationName}
                  </p>
                </div>
              </div>
              {/* MAP AND PICTURE GOES HERE IN THIS DIV BELOW */}
              <div className="bg-graybg w-1/2">MAP HERE</div>
              {/* MAP AND PICTURE GOES HERE IN THIS DIV ABOVE */}
            </div>
            <div
              className={`h-full overflow-y-auto bg-graybg ${showText ? "" : "hidden"}`}
            >
              <div className="flex w-full h-8 bg-primary">
                <div className="group text-sm flex w-1/3">
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
                    <ProductIcon
                      id="products"
                      fill={activeMenu === "products"}
                    />
                    Products
                  </div>
                </div>
              </div>
              <div className="bg-graybg p-4 h-4/5 overflow-y-auto">
                {activeMenu === "detail" && (
                  <EventDetailTab slideUp={slideUp} />
                )}
                {activeMenu === "promotion" && <PromotionTab />}
                {activeMenu === "products" && <ProductTab />}
              </div>
            </div>
          </div>
          <div className="sticky px-4 py-2 flex bg-verylightyellow justify-end">
            <button onClick={slideUp ? handleSlideDown : handleSlideUp}>
              <p className="text-darkgreen underline font-semibold text-sm">
                {slideUp ? "Hide full detail" : "View full detail"}
              </p>
            </button>
          </div>
        </>
      ) : (
        <div className="bg-verylightyellow h-full flex justify-center items-center font-bold text-xl">
          Your store has no event yet.
        </div>
      )}
    </div>
  );
}
