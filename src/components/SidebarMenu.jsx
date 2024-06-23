import React from "react";

export default function SidebarMenu({ menuIcon, menuName, linkTo = "/" }) {
  return (
    <li className="p-2">
      <a className="p-2" href={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </a>
    </li>
  );
}
