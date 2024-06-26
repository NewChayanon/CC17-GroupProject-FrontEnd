import { Outlet } from "react-router-dom";

export default function SellerContainer() {
  return (
    <div className="bg-graybg" style={{ width: "1200px", margin: "auto" }}>
      <Outlet />
    </div>
  );
}
