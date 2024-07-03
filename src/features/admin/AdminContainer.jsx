import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Dashboard from "./Dashboard";
import Footer from "../../layouts/Footer";

export default function AdminContainer() {
  return (
    <div className="h-screen flex flex-col bg-gray-200">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
