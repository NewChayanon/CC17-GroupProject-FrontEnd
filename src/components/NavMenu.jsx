import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu({ menuIcon, menuName, linkTo = "/" }) {
  const { pathname } = useLocation();
  console.log("pathName", pathname);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname === linkTo) {
      setIsActive(true);
    }
  }, []);

  return (
    <li className={`p-2.5 ${isActive && "bg-lightyellow"}`}>
      <Link to={linkTo}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </Link>
    </li>
  );
}
