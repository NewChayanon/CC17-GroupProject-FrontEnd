import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import EventNavBar from "./EventNavBar";

export default function EventMainContainer() {
  return (
    <div className="bg-graybg w-auto" style={{ margin: "auto" }}>
      <Header />
      <EventNavBar />
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
