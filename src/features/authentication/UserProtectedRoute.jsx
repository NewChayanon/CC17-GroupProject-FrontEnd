import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/store/slices/auth-slice";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function UserProtectedRoute({ children }) {
  const { isAuthenticated, status } = useSelector(selectAuth);

  if (isAuthenticated === false && status !== "loading") {
    return <Navigate to="/" />;
  }
  return (
    <>
      {status === "loading" && <LoadingSpinner />}
      {children}
    </>
  );
}
