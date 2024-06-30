import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import StoreMainContainer from "../layouts/StoreMainContainer";

const MainContainer = lazy(() => import("../layouts/MainContainer"));
const EventMainContainer = lazy(() => import("../layouts/EventMainContainer"));
const LandingPage = lazy(() => import("../Pages/LandingPage"));

const LoginPage = lazy(() => import("../Pages/LoginPage"));
const NotLoginPage = lazy(() => import("../Pages/NotLoginPage"));
const HomePage = lazy(() => import("../Pages/HomePage"));
const EventDetail = lazy(() => import("../features/event/EventDetail"));
const Product = lazy(() => import("../features/event/Product"));
const Promotion = lazy(() => import("../features/event/Promotion"));
const StoreDetail = lazy(() => import("../features/store/StoreDetail"));
const Review = lazy(() => import("../features/store/Review"));
const UserProtectedRoute = lazy(
  () => import("../features/authentication/UserProtectedRoute")
);
const InterestedEvent = lazy(() => import("../features/user/InterestedEvent"));

const UserInbox = lazy(() => import("../features/user/UserInbox"));
const FavoriteStores = lazy(() => import("../features/user/FavoriteStores"));
const CollectedCoupons = lazy(
  () => import("../features/user/CollectedCoupons")
);
const UserSettings = lazy(() => import("../features/user/UserSettings"));
const MyStoreContainer = lazy(
  () => import("../features/seller/MyStoreContainer")
);
const MyStoreProtectedRoute = lazy(
  () => import("../features/authentication/MyStoreProtectedRoute")
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
const RequestedReport = lazy(() => import("../features/admin/RequestedReport"));
const AdminContainer = lazy(() => import("../features/admin/AdminContainer"));
const AdminProtectedRoute = lazy(
  () => import("../features/authentication/AdminProtectedRoute")
);

const userRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "not-login", element: <NotLoginPage /> },
  {
    path: "home",
    element: <MainContainer />,
    children: [{ path: "", element: <HomePage /> }],
  },
  {
    path: "user",
    element: (
      <UserProtectedRoute>
        <MainContainer />
      </UserProtectedRoute>
    ),
    children: [
      { path: "interested-event", element: <InterestedEvent /> },
      { path: "inbox", element: <UserInbox /> },
      { path: "favorite-stores", element: <FavoriteStores /> },
      { path: "collected-coupons", element: <CollectedCoupons /> },
      { path: "settings", element: <UserSettings /> },
    ],
  },
  {
    path: "event/:eventId",
    element: <EventMainContainer />,
    children: [
      { path: "detail", element: <EventDetail /> },
      { path: "products", element: <Product /> },
      { path: "promotion", element: <Promotion /> },
    ],
  },
  {
    path: "store/:storeId",
    element: <StoreMainContainer />,
    children: [
      { path: "profile", element: <StoreDetail /> },
      { path: "review", element: <Review /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminContainer />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "seller", element: <ManageSeller /> },
      { path: "buyer", element: <ManageBuyer /> },
      { path: "announcement", element: <Announcement /> },
      { path: "requested-report", element: <RequestedReport /> },
    ],
  },

  // MY STORE IS NOT FINALIZED (TENTATIVE)
  {
    path: "mystore",
    element: (
      <MyStoreProtectedRoute>
        <MyStoreContainer />
      </MyStoreProtectedRoute>
    ),
    children: [
      { path: "created-events", element: <CreatedEvent /> },
      { path: "myshop", element: <MyShop /> },
      { path: "inbox", element: <SellerInbox /> },
      { path: "favoritebuyer", element: <FavoriteBuyer /> },
      { path: "voucher", element: <SellerVoucher /> },
    ],
  },

  // MY STORE IS NOT FINALIZED (TENTATIVE)
]);

export default function Router() {
  return <RouterProvider router={userRouter} />;
}
