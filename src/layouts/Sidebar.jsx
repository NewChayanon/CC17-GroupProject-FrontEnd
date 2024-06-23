import SidebarMenu from "../components/SidebarMenu";
import {
  StoreIcon,
  InboxIcon,
  LogoutIcon,
  VendorNearMeIcon,
  MyFavoriteSeller,
  VoucherListIcon,
} from "../icons/index.jsx";

export default function Sidebar() {
  const sidebarMenuList = [
    {
      menuIcon: <VendorNearMeIcon />,
      menuName: "Seller Near Me",
      linkTo: "/",
      handleClick: "",
    },
    {
      menuIcon: <StoreIcon />,
      menuName: "My Store",
      linkTo: "/",
      handleClick: "",
    },
    {
      menuIcon: <InboxIcon />,
      menuName: "Inbox",
      linkTo: "/",
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
      linkTo: "/",
      handleClick: "",
    },
    {
      menuIcon: <LogoutIcon />,
      menuName: "Logout",
      linkTo: "/",
      handleClick: "",
    },
  ];
  return (
    <div className="hidden xl:flex w-64 min-h-screen bg-white">
      <ul className="mt-3 z-[1] p-2 w-full shadow menu menu-sm dropdown-content bg-white rounded-box ">
        {sidebarMenuList.map((sidebarMenu) => (
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
