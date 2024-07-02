import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Dashboard from "./Dashboard";

export default function AdminContainer() {
  return (
    <div className="w-full bg-gray-400 fixed h-full flex flex-col">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <div className="grow overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
