import userApi from "../../apis/user";

const initialState = {
  inboxMessages: null,
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
      // check if there is unreadMessage
      let countUnread = 0;
      inboxMessages.forEach((message) => {
        if (message.isRead === false) {
          countUnread++;
        }
      });
      set(() => ({
        inboxMessages: response.data.slice(0, 20),
        countUnreadMessage: countUnread,
      }));
      return response.data;
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
