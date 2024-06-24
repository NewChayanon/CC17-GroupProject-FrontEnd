/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/store/slices/auth-slice";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminProtectedRoute({ children }) {
  const { status, user } = useSelector(selectAuth);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!user || user.isAdmin === false) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
