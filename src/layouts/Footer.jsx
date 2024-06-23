import { Link } from "react-router-dom";
import { InstagramIcon } from "../icons";

export default function Footer() {
  return (
    <div className="navbar bg-primary h-12 xl:h-24 flex flex-col xl:flex-row xl:justify-between">
      <div className="flex gap-4">
        <Link to="/">About Us</Link>
        <div>|</div>
        <div className="flex items-center gap-2">
          <Link to="/">Contact Us</Link>
          <Link to="https://instagram.com">
            <InstagramIcon />
          </Link>
        </div>
      </div>
      <div>Copyright @2024 by “Freshy Foodie” </div>
    </div>
  );
}
