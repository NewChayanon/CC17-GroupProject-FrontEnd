import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SidebarMenu({ menuIcon, menuName, linkTo, onClick }) {
  const { pathname } = useLocation();

  let isActive;
  if (pathname === linkTo || pathname === linkTo + "/") isActive = true;

  return (
    <li onClick={onClick} className={`p-2`}>
      <a
        className={`p-2 flex items-center space-x-2 ${isActive && "bg-lightyellow"} hover:text-primary`}
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
