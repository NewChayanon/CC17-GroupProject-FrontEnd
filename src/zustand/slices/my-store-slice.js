import myStoreApi from "../../apis/my-store";

const initialState = {
  storeDetail: {},
  isLoadingMyStore: false,
  errorMyStore: null,
  selectedEvent: null,
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
      return response.data;
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response.data,
        }));
        return error.response.data;
      }
    } finally {
      set(() => ({
        isLoadingMyStore: false,
      }));
    }
  },
  setSelectedEvent: async (event) => {
    try {
      const response = await myStoreApi.getEventDetailByEventId(event.eventId);
      set(() => ({
        selectedEvent: response.data,
      }));
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response.msg,
        }));
        return error.response.msg;
      }
    }
  },

  editEvent: async (eventId, formData) => {
    try {
      await myStoreApi.editEvent(eventId, formData);
      const response = await myStoreApi.getEventDetailByEventId(eventId);
      set(() => ({
        selectedEvent: response.data,
      }));
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response.msg,
        }));
        return error.response.msg;
      }
    }
  },

  formatMonth: (timestamp) => {
    const date = new Date(timestamp);
    const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });
    return monthFormatter.format(date);
  },

  getWeekday: (timestamp) => {
    const date = new Date(timestamp);
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
    return dayFormatter.format(date);
  },

  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const parts = formatter.formatToParts(date);
    const formattedDate = `${parts[2].value} ${parts[0].value} ${parts[4].value}`;
    return formattedDate;
  },
});
