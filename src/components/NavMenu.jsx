import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu({
  menuIcon,
  menuName,
  linkTo,
  onClick,
  notification,
}) {
  return (
    <li onClick={onClick} className={`max-w-full rounded-md`}>
      <a
        className={`p-2 flex items-center space-x-2 hover:text-primary relative`}
        href={linkTo}
      >
        {notification > 0 ? (
          <div className="absolute w-4 h-4 left-2 top-2 rounded-full bg-red-400 text-xs text-white flex items-center justify-center">
            {notification}
          </div>
        ) : null}
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
