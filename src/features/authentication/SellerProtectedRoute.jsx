import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/store/slices/auth-slice";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SellerProtectedRoute({ children }) {
  const { status, user } = useSelector(selectAuth);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!user || user.isSeller === false) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
