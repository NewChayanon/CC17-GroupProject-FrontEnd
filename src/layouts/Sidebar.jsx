import SidebarMenu from "../components/SidebarMenu";
import {
  StoreIcon,
  InboxIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
  CalendarIcon,
} from "../icons/index.jsx";

export default function Sidebar() {
  const buyerSidebarMenuList = [
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

  return (
    <div className="hidden xl:flex w-64 min-h-screen bg-white">
      <ul className="mt-3 z-[1] p-2 w-full shadow menu menu-sm dropdown-content bg-white rounded-box ">
        {buyerSidebarMenuList.map((sidebarMenu) => (
          <SidebarMenu
            menuIcon={sidebarMenu.menuIcon}
            menuName={sidebarMenu.menuName}
            linkTo={sidebarMenu.linkTo}
          />
        ))}
      </ul>
    </div>
  );
}
