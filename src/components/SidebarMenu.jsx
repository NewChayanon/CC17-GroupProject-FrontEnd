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
      <a
        className={`p-2 flex items-center space-x-2 ${isActive && "bg-lightyellow"}`}
        href={linkTo}
      >
        <div className="flex-shrink-0 w-[25px] h-[25px] flex items-center justify-center">
          {menuIcon}
        </div>
        <p className="text-sm">{menuName}</p>
      </a>
    </li>
  );
}
