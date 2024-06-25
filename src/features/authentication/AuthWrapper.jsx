import { useEffect } from "react";
import useStore from "../../zustand/store";
import { getAccessToken } from "../../utils/local-storage";

export default function AuthWrapper({ children }) {
  const getAuthUser = useStore((state) => state.getAuthUser);
  const logout = useStore((state) => state.logout);

  const fetchUser = async () => {
    try {
      if (getAccessToken()) {
        await getAuthUser();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  useEffect(() => {
    fetchUser(), [];
  });

  return children;
}
