import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function MainContainer() {
  return (
    <div className="bg-graybg w-auto m-auto">
      <Header />
      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
