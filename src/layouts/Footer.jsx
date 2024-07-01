import { Link } from "react-router-dom";
import { InstagramIcon } from "../icons";

export default function Footer() {
  return (
    <div className="navbar bg-primary text-white min-h-0 h-12 xl:h-6 flex flex-col xl:flex-row xl:justify-between">
      <div className="flex gap-4 xl:gap-2">
        <Link className="xl:text-[10px]" to="/">
          About Us
        </Link>
        <div className="xl:text-[10px]">|</div>
        <div className="flex items-center gap-2">
          <Link className="xl:text-[10px]" to="/">
            Contact Us
          </Link>
          <Link to="https://instagram.com">
            <InstagramIcon />
          </Link>
        </div>
      </div>
      <div className="text-sm xl:text-[10px]">
        Copyright @2024 by “Freshy Foodie”{" "}
      </div>
    </div>
  );
}
