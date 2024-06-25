import { Navigate } from "react-router-dom";
import useStore from "../../zustand/store";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SellerProtectedRoute({ children }) {
  const { user, isLoading } = useStore((state) => ({
    isLoading: state.isLoading,
    user: state.user,
  }));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || user.isSeller === false) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
