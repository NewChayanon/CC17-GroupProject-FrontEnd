import useStore from "../../zustand/store";
import LoadingSpinner from "../../components/LoadingSpinner";
import NotLoginPage from "../../Pages/NotLoginPage";
import { ROLE } from "../../constants/role-constants";
import UnAuthorizedPage from "../../Pages/UnAuthorizedPage";
import ActivateStoreFromMobile from "../store/ActivateStoreFromMobile";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

export default function myStoreProtectedRoute({ children }) {
  const isLoading = useStore((state) => state.isLoading);

  const isMyStoreLoading = useStore((state) => state.isMyStoreLoading);
  const user = useStore((state) => state.user);

  if (!user)
    return (
      <>
        {isLoading === true && <LoadingSpinner />}
        <NotLoginPage />
      </>
    );
  if (user.role === ROLE.SELLER) {
    return (
      <>
        {isLoading === true && <LoadingSpinner />}
        {isMyStoreLoading === true && <LoadingSpinner />}
        {children}
      </>
    );
  } else if (user.role === ROLE.BUYER) {
    return (
      <>
        <Header />
        <ActivateStoreFromMobile /> <Footer />
      </>
    );
  }
  return <UnAuthorizedPage />;
}
