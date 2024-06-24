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
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/store/slices/auth-slice.js";
export default function Header() {
  // ทำ responsive 2 size 1) mobile 2) desktop
  const { isAuthenticated, user } = useSelector(selectAuth);
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
      linkTo: "/seller",
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
  return (
    <div>
      <div className="navbar bg-secondary h-12 xl:h-24 flex">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img className="w-auto h-full" src={ffLogo} />
          </a>
          <div>
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
                className="inline-block w-5 h-5 stroke-current"
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
