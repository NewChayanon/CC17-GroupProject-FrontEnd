import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu({ menuIcon, menuName, linkTo, onClick }) {
  const { pathname } = useLocation();
  let isActive = false;
  if (pathname === linkTo) {
    isActive = true;
  }

  return (
    <li className={`max-w-full rounded-md ${isActive && "bg-lightyellow"}`}>
      <Link to={linkTo} onClick={onClick}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </Link>
    </li>
  );
}
