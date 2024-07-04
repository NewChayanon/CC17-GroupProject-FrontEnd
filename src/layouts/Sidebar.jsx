import SidebarMenu from "../components/SidebarMenu";
import { useLocation } from "react-router-dom";
import {
  StoreIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
  UserSummary,
  BuyerIcon,
  ReportIcon,
  InboxInbox,
} from "../icons/index.jsx";
import useStore from "../zustand/store.js";
import { InboxIcon } from "../icons/inbox-icon.jsx";
import { DashboardIcon } from "../icons/dashboard-icon.jsx";
import { CalendarIcon } from "../icons/calendar-icon.jsx";
import { ReviewerIcon } from "../icons/reviewer-icon.jsx";
import { FavoriteIcon } from "../icons/favorite-icon.jsx";
import { CouponIcon } from "../icons/coupon-icon.jsx";
import { useState } from "react";

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
      menuIcon: <DashboardIcon />,
      menuName: "Store Main Page",
      linkTo: "/mystore/",
      handleClick: "",
    },
    {
      menuIcon: <CalendarIcon />,
      menuName: "Created Events",
      linkTo: "/mystore/created-events",
      handleClick: "",
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "Store Profile",
      linkTo: "/mystore/profile",
      handleClick: "",
    },
    {
      menuIcon: <ReviewerIcon />,
      menuName: "Store Reviews",
      linkTo: "/mystore/reviews ",
      handleClick: "",
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/mystore/inbox",
      handleClick: "",
    },
    {
      menuIcon: <FavoriteIcon />,
      menuName: "My Followers",
      linkTo: "/mystore/followers",
      handleClick: "",
    },
    {
      menuIcon: <CouponIcon />,
      menuName: "Store Coupon List",
      linkTo: "/mystore/coupon-list",
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
      menuName: "Seller Data",
      linkTo: "/",
      handleClick: "",
      authRequired: true,
    },
    {
      menuIcon: <BuyerIcon />,
      menuName: "Buyer Data",
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
      <ul className="font-semibold text-graylighttext  mt-3 z-[1] p-2 w-full shadow menu menu-sm dropdown-content bg-white rounded-box">
        {pathname.startsWith("/mystore")
          ? sellerSidebarMenuList.map((sidebarMenu) => (
              <div className="hover:text-lightgreen fill-lightgreen">
                <SidebarMenu
                  menuIcon={sidebarMenu.menuIcon}
                  menuName={sidebarMenu.menuName}
                  linkTo={sidebarMenu.linkTo}
                />
              </div>
            ))
          : pathname.startsWith("/admin")
            ? adminSidebarMenuList.map((sidebarMenu) => (
                <div className="hover:text-lightgreen fill-lightgreen">
                  <SidebarMenu
                    menuIcon={sidebarMenu.menuIcon}
                    menuName={sidebarMenu.menuName}
                    linkTo={sidebarMenu.linkTo}
                  />
                </div>
              ))
            : buyerSidebarMenuList.map((sidebarMenu) =>
                sidebarMenu.authRequired && !isAuthenticated ? null : (
                  <div className="hover:text-lightgreen">
                    <SidebarMenu
                      menuIcon={sidebarMenu.menuIcon}
                      menuName={sidebarMenu.menuName}
                      linkTo={sidebarMenu.linkTo}
                    />
                  </div>
                )
              )}
      </ul>
    </div>
  );
}
