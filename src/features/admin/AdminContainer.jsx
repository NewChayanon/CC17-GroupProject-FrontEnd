import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";

export default function AdminContainer() {
  return (
    <div className="w-full bg-graybg">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
