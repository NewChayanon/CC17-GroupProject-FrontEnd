import useStore from "../../zustand/store";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotLoginPage from "../../Pages/NotLoginPage";
import { ROLE } from "../../constants/role-constants";
import UnAuthorizedPage from "../../Pages/UnAuthorizedPage";
import CreateMyStore from "../user/CreateMyStore";

export default function myStoreProtectedRoute({ children }) {
  const isLoading = useStore((state) => state.isLoading);
  const isMyStoreLoading = useStore((state) => state.isMyStoreLoading);
  const user = useStore((state) => state.user);

  if (!user) return <NotLoginPage />;
  if (user.role === ROLE.SELLER) {
    return (
      <>
        {(isLoading === true || isMyStoreLoading === true) && (
          <LoadingSpinner />
        )}
        {children}
      </>
    );
  } else if (user.role === ROLE.BUYER) {
    return <CreateMyStore />;
  }
  return <UnAuthorizedPage />;
}
