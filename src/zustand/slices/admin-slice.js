import adminApi from "../../apis/admin";

const initialState = {
  allUsers: [],
  allEvents: {},
  isLoadingAdmin: false,
  errorAdmin: null,
};

export const createAdminSlice = (set) => ({
  ...initialState,
  adminGetAllUser: async () => {
    set({ isLoadingAdmin: true, errorAdmin: null });
    try {
      const response = await adminApi.getAllUsers();
      set(() => ({
        allUsers: response.data,
        errorAdmin: null,
      }));
    } catch (error) {
      console.log(error);
      set(() => ({
        errorAdmin: error.response.data,
      }));
    } finally {
      set(() => ({
        isLoadingAdmin: false,
      }));
    }
  },
  adminGetAllEvents: async () => {
    set({ isLoadingAdmin: true, errorAdmin: null });
    try {
      const response = await adminApi.getAllEvents();
      set(() => ({
        allEvents: response.data,
        errorAdmin: null,
      }));
    } catch (error) {
      console.log(error);
      set(() => ({
        errorAdmin: error.response.data,
      }));
    } finally {
      set(() => ({
        isLoadingAdmin: false,
      }));
    }
  },
});
