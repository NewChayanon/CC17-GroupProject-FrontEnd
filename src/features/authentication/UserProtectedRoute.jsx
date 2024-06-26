/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import useStore from "../../zustand/store";

export default function UserProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  }));

  if (isAuthenticated === false && isLoading === false) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isLoading === true && <LoadingSpinner />}
      {children}
    </>
  );
}
