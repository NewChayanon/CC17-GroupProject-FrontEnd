import SidebarMenu from "../components/SidebarMenu";
import { useLocation } from "react-router-dom";
import {
  StoreIcon,
  InboxIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
  CalendarIcon,
  UserSummary,
  BuyerIcon,
  ReportIcon,
  InboxInbox,
} from "../icons/index.jsx";
import useStore from "../zustand/store.js";

export default function Sidebar() {
  const { pathname } = useLocation();
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const buyerSidebarMenuList = [
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
      linkTo: "/",
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
  const sellerSidebarMenuList = [
    {
      menuIcon: <CalendarIcon />,
      menuName: "My Created Events",
      linkTo: "/seller/createdevent",
      handleClick: "",
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "My Shop",
      linkTo: "/seller/myshop",
      handleClick: "",
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/seller/inbox",
      handleClick: "",
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Offer Voucher List",
      linkTo: "/seller/voucher",
      handleClick: "",
    },
  ];
  const adminSidebarMenuList = [
    {
      menuIcon: <UserSummary />,
      menuName: "Executive Summary",
      linkTo: "/",
      handleClick: "",
      authRequired: false,
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "Seller",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <BuyerIcon />,
      menuName: "Buyer",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <InboxInbox />,
      menuName: "Inbox",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <ReportIcon />,
      menuName: "Report List",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
  ];
  return (
    <div className="hidden xl:flex w-64 min-h-screen bg-white">
      <ul className="mt-3 z-[1] p-2 w-full shadow menu menu-sm dropdown-content bg-white rounded-box ">
        {pathname.startsWith("/mystore")
          ? sellerSidebarMenuList.map((sidebarMenu) => (
              <SidebarMenu
                menuIcon={sidebarMenu.menuIcon}
                menuName={sidebarMenu.menuName}
                linkTo={sidebarMenu.linkTo}
              />
            ))
          : pathname.startsWith("/admin")
            ? adminSidebarMenuList.map((sidebarMenu) => (
                <SidebarMenu
                  menuIcon={sidebarMenu.menuIcon}
                  menuName={sidebarMenu.menuName}
                  linkTo={sidebarMenu.linkTo}
                />
              ))
            : buyerSidebarMenuList.map((sidebarMenu) =>
                sidebarMenu.authRequired && !isAuthenticated ? null : (
                  <SidebarMenu
                    menuIcon={sidebarMenu.menuIcon}
                    menuName={sidebarMenu.menuName}
                    linkTo={sidebarMenu.linkTo}
                  />
                )
              )}
      </ul>
    </div>
  );
}
