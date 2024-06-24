import React from "react";
import { Link } from "react-router-dom";

export default function NavMenu({ menuIcon, menuName, linkTo }) {
  console.log();
  return (
    <li className="p-2.5">
      <Link to={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </Link>
    </li>
  );
}
