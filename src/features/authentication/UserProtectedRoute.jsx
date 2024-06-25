/* eslint-disable react/prop-types */
import LoadingSpinner from "../../components/LoadingSpinner";
import useStore from "../../zustand/store";
import NotLoginPage from "../../Pages/NotLoginPage";

export default function UserProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  }));

  if (isAuthenticated === false && isLoading === false) {
    return <NotLoginPage />;
  }
  return (
    <>
      {isLoading === true && <LoadingSpinner />}
      {children}
    </>
  );
}
