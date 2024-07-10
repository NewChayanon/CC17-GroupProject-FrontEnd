import myStoreApi from "../../apis/my-store";

const initialState = {
  storeDetail: {},
  isLoadingMyStore: false,
  errorMyStore: null,
  selectedEvent: null,
  eventInfo: null,

  storeInfo: {},

  slideUp: false,
  showText: false,
  redirectEdit: false,

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

  addDefaultTime: (date) => {
    const dateTimeString = `${date}T00:00:00.000Z`;
    return dateTimeString;
  },

  addDefaultDate: (time) => {
    const dateTimeString = `1970-01-01T${time}:00.000Z`;
    return dateTimeString;
  },

  getCreatedEvents: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getAllEventList();
      set(() => ({
        eventInfo: response.data,
        errorMyStore: null,
      }));
      return response.data;
    } catch (err) {
      if (err.response) {
        set(() => ({
          errorMyStore: err.response.data,
        }));
        return err.response.data;
      }
    } finally {
      set(() => ({
        isLoadingMyStore: false,
      }));
    }
  },


  getMyStoreInfo: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyStoreInfo();
      set(() => ({
        storeInfo: response.data,
        errorMyStore: null,
      }));
      return response.data;
    } catch (err) {
      if (err.response) {
        set(() => ({
          errorMyStore: err.response.data,
        }));
        return err.response.data;
      }
    } finally {
      set(() => ({
        isLoadingMyStore: false,
      }));
    }

  convertTime: (time24) => {
    let [hours, minutes] = time24.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  },

  setSlideUp: (boolean) => {
    set(() => ({
      slideUp: boolean,
    }));
  },

  setRedirectEdit: (boolean) => {
    set(() => ({
      redirectEdit: boolean,
    }));
  },

  setShowText: (boolean) => {
    set(() => ({
      showText: boolean,
    }));

  },
});
