import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavMenu({ menuIcon, menuName, linkTo = "/", onClick }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (pathname === linkTo) {
      setIsActive(true);
    }
  }, []);

  return (
    <li className={`p-2.5 ${isActive && "bg-lightyellow"}`}>
      <Link to={linkTo} onClick={onClick}>
        {menuIcon}
        <p className="text-sm">{menuName}</p>
      </Link>
    </li>
  );
}
