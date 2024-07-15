import userApi from "../../apis/user";

const initialState = {
  inboxMessages: [],
  countUnreadMessage: 0,
  isLoadingInboxMessages: false,
  errorFetchInbox: null,
};

export const createInboxSlice = (set) => ({
  ...initialState,
  getInboxMessages: async () => {
    set({ ...initialState, isLoadingMyStore: true });
    console.log("Running getInboxMessages");
    try {
      const response = await userApi.getInboxMessages();
      console.log(
        "result from fetching inbox data",
        response.data.slice(0, 20)
      );
      console.log("run this line");
      // check if there is unreadMessage
      // count number of unread messages
      let isRead = response.data.length;
      if (isRead > 0)
        set(() => ({
          inboxMessages: response.data.slice(0, 20),
          countUnreadMessage: 1,
        }));
      return response.data.slice(0, 20);
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorFetchInbox: error.response.data,
        }));
        return error.response.data;
      }
    } finally {
      set(() => ({
        isLoadingInboxMessages: false,
      }));
    }
  },
});
