import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu({ menuIcon, menuName, linkTo, onClick }) {
  const { pathname } = useLocation();
  let isActive = false;
  if (pathname === linkTo || pathname === linkTo + "/") isActive = true;

  return (
    <li
      onClick={onClick}
      className={`max-w-full rounded-md ${isActive && "bg-verylightyellow"}`}
    >
      <a
        className={`p-2 flex items-center space-x-2 ${isActive && "bg-lightyellow"} hover:text-primary`}
        href={linkTo}
      >
        <div className="flex-shrink-0 w-[25px] h-[25px] flex items-center justify-center">
          {menuIcon}
        </div>
        <p className="text-sm">{menuName}</p>
      </a>
      {/* <Link to={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </Link> */}
    </li>
  );
}
