import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const MainContainer = lazy(() => import("../layouts/MainContainer"));
const HomePage = lazy(() => import("../Pages/TestRedux"));
const StorePage = lazy(() => import("../Pages/StorePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "store/:storeId", element: <StorePage /> },
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
