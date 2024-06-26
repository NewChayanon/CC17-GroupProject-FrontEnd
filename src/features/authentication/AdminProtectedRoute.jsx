/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useStore from "../../zustand/store";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminProtectedRoute({ children }) {
  const { user, isLoading } = useStore((state) => ({
    isLoading: state.isLoading,
    user: state.user,
  }));

  if (isLoading === true) {
    return <LoadingSpinner />;
  }

  if (!user || user.isAdmin === false) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
