import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

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

const router = createBrowserRouter([
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
          { path: "/user/booked", element: <Booked /> },
          { path: "/user/inbox", element: <UserInbox /> },
          { path: "/user/favoritevendor", element: <FavoriteVendor /> },
          { path: "/user/voucher", element: <UserVoucher /> },
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
          { path: "/seller/createdevent", element: <CreatedEvent /> },
          { path: "/seller/myshop", element: <MyShop /> },
          { path: "/seller/inbox", element: <SellerInbox /> },
          { path: "/seller/favoritebuyer", element: <FavoriteBuyer /> },
          { path: "/seller/voucher", element: <SellerVoucher /> },
        ],
      },

      {
        path: "/store/:storeId",
        element: <StorePage />,
        children: [
          {
            path: "/store/:storeId/detail",
            element: <StoreDetail />,
          },
          {
            path: "/store/:storeId/featuredproduct",
            element: <FeaturedProduct />,
          },
          {
            path: "/store/:storeId/upcomingevent",
            element: <UpcomingEvent />,
          },
          {
            path: "/store/:storeId/review",
            element: <Review />,
          },
        ],
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        children: [
          {
            path: "/event/:eventId/detail",
            element: <EventDetail />,
          },
          {
            path: "/event/:eventId/product",
            element: <Product />,
          },
          {
            path: "/event/:eventId/promotion",
            element: <Promotion />,
          },
          {
            path: "/event/:eventId/about",
            element: <AboutSeller />,
          },
        ],
      },
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
