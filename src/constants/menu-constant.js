import {
    StoreIcon,
    InboxIcon,
    LogoutIcon,
    VendorNearMeIcon,
    MyFavoriteSeller,
    VoucherListIcon,
  } from "../icons/index.jsx";


BUYER_NAVBAR = 

BUYER_SIDEBAR = [
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Seller Near Me",
      linkTo: "/",
      handleClick: "",
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "My Store",
      linkTo: "/seller",
      handleClick: "",
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/user/inbox",
      handleClick: "",
    },
    {
      menuIcon: <MyFavoriteSeller />,
      menuName: "My Favorite Seller",
      linkTo: "/",
      handleClick: "",
    },
    {
      menuIcon: <VoucherListIcon />,
      menuName: "Voucher List",
      linkTo: "/user/voucher",
      handleClick: "",
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "Logout",
      linkTo: "/",
      handleClick: "",
    },
  ];

SELLER_SIDEBAR = 

ADMIN_SIDEBAR = 