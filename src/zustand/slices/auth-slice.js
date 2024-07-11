import { removeAccessToken, setAccessToken } from "../../utils/local-storage";
import authApi from "../../apis/auth";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
  logoutModal: false,
};

export const createAuthSlice = (set) => ({
  ...initialState,
  logout: () => {
    set({ ...initialState });
    removeAccessToken();
    set(() => ({
      logoutModal: true,
    }));
  },
  login: async (credentials) => {
    set({ ...initialState, isLoading: true });
    try {
      const response = await authApi.login(credentials);
      setAccessToken(response.data.accessToken);
      set(() => ({
        isAuthenticated: true,
        user: response.data.existUser,
        error: null,
      }));
      return response.data;
    } catch (error) {
      set(() => ({
        error: error.response.data,
      }));
      return error.response.data;
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
  register: async (credentials) => {
    try {
      const response = await authApi.register(credentials);
      return response.data;
    } catch (error) {
      console.log(error);
      set(() => ({
        error: error.response.data,
      }));
      return error.response.data;
    }
  },

  stopLoading: () => {
    set({ isLoading: false });
  },
  getAuthUser: async () => {
    set({ ...initialState, isLoading: true });
    try {
      const response = await authApi.getAuthUser();
      set(() => ({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
      }));
    } catch (error) {
      console.log(error);
      set(() => ({
        error: error.response.data,
      }));
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
});
