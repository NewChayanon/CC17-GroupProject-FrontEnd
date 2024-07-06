import myStoreApi from "../../apis/my-store";

const initialState = {
  storeDetail: {},
  isLoadingMyStore: false,
  errorMyStore: null,
};

export const createMyStoreSlice = (set) => ({
  ...initialState,
  getMyStore: async () => {
    set({ ...initialState, isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyStore();
      set(() => ({
        storeDetail: response.data,
        errorMyStore: null,
      }));
    } catch (error) {
      set(() => ({
        errorMyStore: error.response.data,
      }));
      return error.response.data;
    } finally {
      set(() => ({
        isLoadingMyStore: false,
      }));
    }
  },
});
