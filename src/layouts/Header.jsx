import {
  StoreIcon,
  InboxIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
} from "../icons/index.jsx";
import ffLogo from "../assets/FF-logo.png";
import NavMenu from "../components/NavMenu.jsx";
import { Link } from "react-router-dom";
import useStore from "../zustand/store.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SettingsIcon from "../icons/SettingsIcon.jsx";
import { InterestedEventIcon } from "../icons/interested-event-icon.jsx";
import { SettingIcon } from "../icons/setting-icon.jsx";

export default function Header() {
  // ทำ responsive 2 size 1) mobile 2) desktop
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navMenuList = [
    {
      menuIcon: <StoreIcon />,
      menuName: "My Store",
      linkTo: "/mystore",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "User Log-in",
      linkTo: "/login",
      handleClick: "",
      authRequired: false,
    },
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Sellers nearby",
      linkTo: "/home",
      handleClick: "",
      authRequired: false,
    },
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Interested Events",
      linkTo: "/user/interested-event",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/user/inbox",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <MyFavoriteSeller />,
      menuName: "My Favorite Stores",
      linkTo: "/user/favorite-stores",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Collected Coupons",
      linkTo: "/user/collected-coupons",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <SettingIcon />,
      menuName: "Settings",
      linkTo: "/user/settings",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Contact Us",
      linkTo: "/contact-us",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "Logout",
      linkTo: "/home",
      handleClick: () => logout(),
      authRequired: true,
    },
  ];

  return (
    <div
      className={`navbar ${pathname.includes("/admin") ? "bg-graylighttext" : pathname.includes("/mystore") ? "bg-tertiary" : "bg-secondary"} h-16 xl:h-16 flex justify-between items-center`}
    >
      <div className="flex justify-between items-center">
        <a className="btn btn-ghost text-md" onClick={() => navigate("/")}>
          <img className="w-12 h-12" src={ffLogo} />
        </a>
        <div className="text-verydarkbrown font-semibold">
          <p className="text-xl">Freshy Foodie</p>
          <p className="text-sm">Freshly Meet, Freshly Eat</p>
        </div>
      </div>
      {/* HAMBURGER MENU FOR MOBILE* smallest until lg*/}

      <div className="flex-none gap-2 xl:hidden">
        <div className="dropdown dropdown-end ">
          {/* HAMBURGER BUTTON*/}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar w-auto flex gap-4 justify-end items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-7 h-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          {/* Dropdown Menu*/}
          <ul
            tabIndex={0}
            className="mt-3 z-[40] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-48"
          >
            {/* User Profile*/}
            <li>
              {/* <div className="btn btn-ghost avatar w-48 flex gap-4 justify-start items-center"> */}
              <div className="avatar w-48 flex gap-4 justify-start items-center">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
                <p>Hi {user ? user.name : "Guest"}!</p>
              </div>
              {/* Other Menu*/}
            </li>

            {navMenuList.map((navMenu, index) =>
              navMenu.authRequired && !isAuthenticated ? null : (
                <NavMenu
                  key={index}
                  menuIcon={navMenu.menuIcon}
                  menuName={navMenu.menuName}
                  linkTo={navMenu.linkTo}
                  onClick={navMenu.handleClick}
                />
              )
            )}
          </ul>
        </div>
      </div>
      {/* MYSTORE MENU - ONLY DISPLAY AT xl & with AuthContext*/}
      {/* AVATAR MENU FOR DESKTOP - ONLY DISPLAY AT xl */}
      <div className="flex-none gap-2 hidden xl:flex ">
        {isAuthenticated ? (
          <Link to="/">
            <div className="btn btn-ghost hidden xl:flex bg-darkbrown">
              <StoreIcon />
              <p>My Store</p>
            </div>
          </Link>
        ) : null}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar w-48 flex gap-4 justify-start items-center"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
            <p>Hi Guest</p>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-48"
          >
            {navMenuList.map((navMenu, index) =>
              navMenu.authRequired && !isAuthenticated ? null : (
                <NavMenu
                  key={index}
                  menuIcon={navMenu.menuIcon}
                  menuName={navMenu.menuName}
                  linkTo={navMenu.linkTo}
                  onClick={navMenu.handleClick}
                />
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
