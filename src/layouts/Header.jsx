import {
  StoreIcon,
  InboxIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
  FFLogo,
  CouponIcon,
} from "../icons/index.jsx";
import ffLogo from "../assets/FF-logo.png";
import NavMenu from "../components/NavMenu.jsx";
import { Link } from "react-router-dom";
import useStore from "../zustand/store.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SettingIcon } from "../icons/setting-icon.jsx";
import LoginIcon from "../icons/login-icon.jsx";
import ContactUsIcon from "../icons/contactus-icon.jsx";

export default function Header() {
  // ทำ responsive 2 size 1) mobile 2) desktop
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.user);
  const countUnreadMessage = useStore((state) => state.countUnreadMessage);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navMenuList = [
    {
      menuIcon: <StoreIcon />,
      menuName: "My Store",
      linkTo: "/mystore",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: false,
    },

    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Sellers nearby",
      linkTo: "/home",
      handleClick: "",
      authRequired: false,
      appearWhenLogin: true,
      notification: false,
    },
    {
      menuIcon: <CouponIcon isActive={false} size={25} />,
      menuName: "Interested Events",
      linkTo: "/user/interested-event",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/user/inbox",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: countUnreadMessage
    },
    {
      menuIcon: <MyFavoriteSeller />,
      menuName: "My Favorite Stores",
      linkTo: "/user/favorite-stores",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Collected Coupons",
      linkTo: "/user/collected-coupons",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
    },
    {
      menuIcon: <SettingIcon />,
      menuName: "Settings",
      linkTo: "/user/settings",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
    },
    {
      menuIcon: <ContactUsIcon />,
      menuName: "Contact Us",
      linkTo: "/contact-us",
      handleClick: "",
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "User Login",
      linkTo: "/login",
      handleClick: "",
      authRequired: false,
      appearWhenLogin: false,
      notification: 0,
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "Logout",
      linkTo: "/home",
      handleClick: () => logout(),
      authRequired: true,
      appearWhenLogin: true,
      notification: 0,
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
            className="mt-3 z-[40] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
          >
            {/* User Profile*/}
            <li>
              {/* <div className="btn btn-ghost avatar w-48 flex gap-4 justify-start items-center"> */}
              <div className="avatar w-48 flex gap-4 py-2 justify-start items-center shadow">
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`${user ? user.profileImage || ffLogo : ffLogo}`}
                  />
                </div>
                <p className="font-semibold">
                  Hi!{" "}
                  {user
                    ? user.displayName?.slice(0, 10) || user.firstName
                    : "Guest"}
                </p>
              </div>
              {/* Other Menu*/}
            </li>
            {navMenuList.map((navMenu, index) =>
              navMenu.authRequired && !isAuthenticated ? null : (
                <div className="hover:text-lightgreen fill-lightgreen">
                  <NavMenu
                    key={index}
                    menuIcon={navMenu.menuIcon}
                    menuName={navMenu.menuName}
                    linkTo={navMenu.linkTo}
                    onClick={navMenu.handleClick}
                    notification={navMenu.notification}
                  />
                </div>
              )
            )}
          </ul>
        </div>
      </div>
      {/* MYSTORE MENU - ONLY DISPLAY AT xl & with AuthContext*/}
      {/* AVATAR MENU FOR DESKTOP - ONLY DISPLAY AT xl */}
      <div className="flex-none gap-2 hidden xl:flex ">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost avatar min-w-48 bg-white flex gap-2 py-2 justify-start items-center "
          >
            <div className="w-8 rounded-full border border-b-1">
              <img
                alt="Tailwind CSS Navbar component"
                src={`${user ? user.profileImage || ffLogo : ffLogo}`}
              />
            </div>
            <p className="font-semibold text-black overflow-hidden">
              Hi!{" "}
              {user ? user.displayName?.slice(0, 13) || user.firstName : "Guest"}
            </p>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
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
