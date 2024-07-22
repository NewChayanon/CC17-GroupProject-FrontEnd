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
    set({ ...initialState, isLoadingInboxMessages: true });
    console.log("Running getInboxMessages");
    try {
      const response = await userApi.getInboxMessages();
      console.log(
        "result from fetching inbox data",
        response.data.slice(0, 20)
      );
      console.log("run this line");

      // Count number of unread messages directly from the response data
      let count = 0;
      response.data.forEach((message) => {
        if (!message.isRead) {
          count++;
        }
      });

      set(() => ({
        inboxMessages: response.data.slice(0, 20),
        countUnreadMessage: count,
        isLoadingInboxMessages: false, // Set loading to false here since the request was successful
      }));

      return response.data.slice(0, 20);
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorFetchInbox: error.response.data,
          isLoadingInboxMessages: false, // Set loading to false here as well
        }));
        return error.response.data;
      }
    }
  },
});
