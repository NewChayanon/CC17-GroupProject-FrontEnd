import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SidebarMenu({ menuIcon, menuName, linkTo = "/" }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname === linkTo) {
      setIsActive(true);
    }
  }, []);
  return (
    <li className={`p-2`}>
      <a className={`p-2 ${isActive && "bg-lightyellow"}`} href={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </a>
    </li>
  );
}
