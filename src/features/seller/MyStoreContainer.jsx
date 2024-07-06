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
    <div className="h-auto flex flex-col ">
      <Header />
      <div className="flex flex-1 overflow-hidden bg-graybg">
        <Sidebar />
        <div className="flex flex-1 h-[calc(100vh-136px)] overflow-y-auto flex-wrap">
          <Outlet />
        </div>
        {showRightSidebar && <RightSidebar />}
      </div>
      <div className="z-50">
        <Footer />
      </div>
    </div>
  );
}
