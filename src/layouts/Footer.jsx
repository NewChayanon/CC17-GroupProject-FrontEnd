import { Link } from "react-router-dom";
import { InstagramIcon } from "../icons";

export default function Footer() {
  return (
    <div className=" bg-primary pb-2 xl:pb-1 xl:pt-1 xl:items-center xl:flex">
      <div className="navbar bg-primary text-white min-h-0 h-16 xl:h-7 flex flex-col xl:flex-row xl:justify-between ">
        <div className="p-1 flex gap-4 xl:gap-2 ">
          <Link className="xl:text-sm" to="/">
            About Us
          </Link>
          <div className="xl:text-sm">|</div>
          <div className="flex items-center gap-2">
            <Link className="xl:text-sm" to="/">
              Contact Us
            </Link>
            <Link to="https://instagram.com">
              <InstagramIcon />
            </Link>
          </div>
        </div>
        <div className="text-sm xl:text-sm">
          Copyright @2024 by “Freshy Foodie”
        </div>
      </div>
    </div>
  );
}
