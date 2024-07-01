import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function MainContainer() {
  return (
    <div className="bg-graybg" style={{ width: "430px", margin: "auto" }}>
      <Header />
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
