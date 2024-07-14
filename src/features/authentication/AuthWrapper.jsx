import { useEffect } from "react";
import useStore from "../../zustand/store";
import { getAccessToken } from "../../utils/local-storage";

export default function AuthWrapper({ children }) {
  const getAuthUser = useStore((state) => state.getAuthUser);
  const logout = useStore((state) => state.logout);
  const stopLoading = useStore((state) => state.stopLoading);

  const fetchUser = async () => {
    try {
      if (getAccessToken()) {
        await getAuthUser();
      }
    } catch (error) {
      console.log(error);
      logout();
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchUser(), [];
  });

  return children;
}
