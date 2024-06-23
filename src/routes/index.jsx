import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/store/slices/auth-slice";

const MainContainer = lazy(() => import("../layouts/MainContainer"));
const HomePage = lazy(() => import("../Pages/TestRedux"));
const StorePage = lazy(() => import("../Pages/StorePage"));
const EventPage = lazy(() => import("../Pages/EventPage"));
const EventDetail = lazy(() => import("../features/event/EventDetail"));
const Product = lazy(() => import("../features/event/Product"));
const Promotion = lazy(() => import("../features/event/Promotion"));
const AboutSeller = lazy(() => import("../features/event/AboutSeller"));
const StoreDetail = lazy(() => import("../features/store/StoreDetail"));
const FeaturedProduct = lazy(() => import("../features/store/FeaturedProduct"));
const UpcomingEvent = lazy(() => import("../features/store/UpcomingEvent"));
const Review = lazy(() => import("../features/store/Review"));
const UserProtectedRoute = lazy(() =>
  import("../features/authentication/UserProtectedRoute")
);
const UserContainer = lazy(() => import("../features/user/UserContainer"));
const Booked = lazy(() => import("../features/user/Booked"));

const UserInbox = lazy(() => import("../features/user/UserInbox"));
const FavoriteVendor = lazy(() => import("../features/user/FavoriteVendor"));
const UserVoucher = lazy(() => import("../features/user/UserVoucher"));
const SellerContainer = lazy(() =>
  import("../features/seller/SellerContainer")
);
const SellerProtectedRoute = lazy(() =>
  import("../features/authentication/SellerProtectedRoute")
);
const CreatedEvent = lazy(() => import("../features/seller/CreatedEvent"));
const MyShop = lazy(() => import("../features/seller/MyShop"));
const SellerInbox = lazy(() => import("../features/seller/SellerInbox"));
const FavoriteBuyer = lazy(() => import("../features/seller/FavoriteBuyer"));
const SellerVoucher = lazy(() => import("../features/seller/SellerVoucher"));
const Dashboard = lazy(() => import("../features/admin/Dashboard"));
const ManageBuyer = lazy(() => import("../features/admin/ManageBuyer"));
const ManageSeller = lazy(() => import("../features/admin/ManageSeller"));
const Announcement = lazy(() => import("../features/admin/Announcement"));

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/user",
        element: (
          <UserProtectedRoute>
            <UserContainer />
          </UserProtectedRoute>
        ),
        children: [
          { path: "booked", element: <Booked /> },
          { path: "inbox", element: <UserInbox /> },
          { path: "favoritevendor", element: <FavoriteVendor /> },
          { path: "voucher", element: <UserVoucher /> },
        ],
      },
      {
        path: "/seller",
        element: (
          <SellerProtectedRoute>
            <SellerContainer />
          </SellerProtectedRoute>
        ),
        children: [
          { path: "createdevent", element: <CreatedEvent /> },
          { path: "myshop", element: <MyShop /> },
          { path: "inbox", element: <SellerInbox /> },
          { path: "favoritebuyer", element: <FavoriteBuyer /> },
          { path: "voucher", element: <SellerVoucher /> },
        ],
      },

      {
        path: "/store/:storeId",
        element: <StorePage />,
        children: [
          { path: "detail", element: <StoreDetail /> },
          { path: "featuredproduct", element: <FeaturedProduct /> },
          { path: "upcomingevent", element: <UpcomingEvent /> },
          { path: "review", element: <Review /> },
        ],
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        children: [
          { path: "detail", element: <EventDetail /> },
          { path: "product", element: <Product /> },
          { path: "promotion", element: <Promotion /> },
          { path: "about", element: <AboutSeller /> },
        ],
      },
    ],
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "buyer", element: <ManageBuyer /> },
      { path: "seller", element: <ManageSeller /> },
      { path: "announcement", element: <Announcement /> },
    ],
  },
]);

export default function Router() {
  const { user } = useSelector(selectAuth);
  let finalRouter;

  if (!user || user.isAdmin === false) {
    finalRouter = userRouter;
  } else if (user.isAdmin === true) {
    finalRouter = adminRouter;
  }

  return <RouterProvider router={finalRouter} />;
}
