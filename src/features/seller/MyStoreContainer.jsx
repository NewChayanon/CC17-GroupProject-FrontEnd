import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import RightSidebar from "./RightSideBar";
import { useLocation } from "react-router-dom";

export default function MyStoreContainer() {
  const location = useLocation();
  const showRightSidebar = [
    "/mystore/created-events",
    "/mystore/reviews",
  ].includes(location.pathname);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        {showRightSidebar && <RightSidebar />}
      </div>
      <Footer />
    </div>
  );
}
