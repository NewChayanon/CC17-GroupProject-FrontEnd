/* eslint-disable react/prop-types */
import LoadingSpinner from "../../components/LoadingSpinner";
import useStore from "../../zustand/store";
import NotLoginPage from "../../Pages/NotLoginPage";
import { ROLE } from "../../constants/role-constants";
import UnAuthorizedPage from "../../Pages/UnAuthorizedPage";

export default function UserProtectedRoute({ children }) {
  const isLoading = useStore((state) => state.isLoading);
  const user = useStore((state) => state.user);

  if (!user) return <NotLoginPage />;
  if (user.role === ROLE.BUYER || user.role === ROLE.SELLER) {
    return (
      <>
        {isLoading === true && <LoadingSpinner />}
        {children}
      </>
    );
  } else if (user.role === ROLE.ADMIN) {
    return <UnAuthorizedPage />;
  }
}
