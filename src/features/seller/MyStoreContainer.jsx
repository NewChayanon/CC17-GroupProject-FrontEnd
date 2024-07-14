import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import RightSidebar from "./RightSideBar";
import { useLocation } from "react-router-dom";

export default function MyStoreContainer() {
  const location = useLocation();
  const showRightSidebar = [
    "/mystore",
    "/mystore/",
    "/mystore/profile",
    "/mystore/profile/",
    "/mystore/created-events",
    "/mystore/created-events/",
    "/mystore/followers",
    "/mystore/followers/",
    "/mystore/reviews",
    "/mystore/reviews/",
    "/mystore/unauthorized",
  ].includes(location.pathname);

  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex overflow-hidden bg-graybg">
        <div>
          <Sidebar />
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-1 min-h-[calc(100vh-136px)] h-full w-full max-w-[1280px] overflow-y-auto justify-center">
            <Outlet />
          </div>
        </div>
        {showRightSidebar && <RightSidebar />}
      </div>
      <div className="z-30">
        <Footer />
      </div>
    </div>
  );
}
