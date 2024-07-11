import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import StoreNavBar from "./StoreNavBar";

export default function StoreMainContainer() {
  return (
    <div
      className="bg-graybg"
      style={{ width: "auto", margin: "auto" }}
    >
      <Header />
      <StoreNavBar />
      <div className="flex">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
