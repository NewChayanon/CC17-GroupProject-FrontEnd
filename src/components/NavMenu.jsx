import React from "react";

export default function NavMenu({ menuIcon, menuName, linkTo = "/" }) {
  return (
    <li className="p-2.5">
      <a href={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </a>
    </li>
  );
}
