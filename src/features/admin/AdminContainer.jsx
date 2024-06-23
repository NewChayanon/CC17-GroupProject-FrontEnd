import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";

export default function AdminContainer() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
