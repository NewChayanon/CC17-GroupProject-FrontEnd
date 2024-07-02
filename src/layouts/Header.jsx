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

export default function Header() {
  // ทำ responsive 2 size 1) mobile 2) desktop
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navMenuList = [
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Seller Near Me",
      linkTo: "/home",
      handleClick: "",
      authRequired: false,
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "My Store",
      linkTo: "/home/seller",
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
      menuName: "My Favorite Seller",
      linkTo: "/user/favoriteseller",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Voucher List",
      linkTo: "/user/voucher",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "Logout",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
  ];

  console.log(pathname);
  return (
    <div>
      <div
        className={`navbar ${pathname.includes("/admin") ? "bg-graylighttext" : pathname.includes("/mystore") ? "bg-tertiary" : "bg-secondary"} h-20 xl:h-24 flex justify-between items-center`}
      >
        <div className="flex justify-between items-center">
          <a className="btn btn-ghost text-md" onClick={() => navigate("/")}>
            <img className="w-16 h-16" src={ffLogo} />
          </a>
          <div className="text-darkbrown font-semibold">
            <p className="text-2xl">Freshy Foodie</p>
            <p className="text-base">Freshly Meet, Freshly Eat</p>
          </div>
        </div>
        {/* HAMBURGER MENU FOR MOBILE* smallest until lg*/}

        <div className="flex-none gap-2 xl:hidden">
          <div className="dropdown dropdown-end">
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-48"
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
                  <p>Hi {user ? user.name : "Guest"}</p>
                </div>
                {/* Other Menu*/}
              </li>

              {navMenuList.map((navMenu) =>
                navMenu.authRequired && !isAuthenticated ? null : (
                  <NavMenu
                    menuIcon={navMenu.menuIcon}
                    menuName={navMenu.menuName}
                    linkTo={navMenu.linkTo}
                  />
                )
              )}
            </ul>
          </div>
        </div>
        {/* MYSTORE MENU - ONLY DISPLAY AT xl & with AuthContext*/}
        {isAuthenticated ? (
          <Link to="/">
            <div className="btn btn-ghost hidden xl:flex bg-darkbrown">
              <StoreIcon />
              <p>My Store</p>
            </div>
          </Link>
        ) : null}
        {/* AVATAR MENU FOR DESKTOP - ONLY DISPLAY AT xl */}
        <div className="flex-none gap-2 hidden xl:block">
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
                  />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
