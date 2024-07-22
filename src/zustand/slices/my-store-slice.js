import myStoreApi from "../../apis/my-store";
import userApi from "../../apis/user";

const initialState = {
  storeDetail: {},
  isLoadingMyStore: false,
  errorMyStore: null,
  selectedEvent: null,
  eventInfo: null,

  storeInfo: {},
  reviewInfo: null,
  productInfo: [],
  followerId: null,

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

  getMyStoreReviews: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyStoreReviews();
      set(() => ({
        reviewInfo: response.data,
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

  getMyStoreProducts: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyProducts();
      set(() => ({
        productInfo: response.data,
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

  getMyFollowers: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyStoreFollowers();
      set(() => ({
        followerInfo: response.data,
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

  getMyCoupons: async () => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.getMyStoreCoupons();
      set(() => ({
        couponInfo: response.data,
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

  activateMyStore: async (body) => {
    try {
      await userApi.createStore(body);
    } catch (error) {
      console.log(error);
      set(() => ({
        errorMyStore: error.response.data,
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
          errorMyStore: error.response,
        }));
        return error.response;
      }
    }
  },

  createEvent: async (formData) => {
    set({ isLoadingMyStore: true });
    try {
      const res = await myStoreApi.createEvent(formData);
      return res;
    } catch (error) {
      if (error.response) {
        set({
          errorMyStore: error.response,
        });
        return error.response;
      }
    } finally {
      set({ isLoadingMyStore: false });
    }
  },

  setFollowerId: (id) => {
    set({ followerId: id });
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
          errorMyStore: error.response,
        }));
        return error.response;
      }
    }
  },

  deleteEvent: async (eventId) => {
    try {
      await myStoreApi.deleteEvent(eventId);
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response,
        }));
        return error.response;
      }
    }
  },

  editStoreDescription: async (body) => {
    set({ isLoadingMyStore: true });
    try {
      const response = await myStoreApi.editStoreDescription(body);
      set((state) => ({
        storeInfo: {
          ...state.storeInfo,
          storeProfileSellerDescription: response.data.sellerDescription,
          storeProfileDescription: response.data.description,
        },
      }));
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response,
        }));
      }
    } finally {
      set({ isLoadingMyStore: false });
    }
  },

  updateCoverImage: async (formData) => {
    set({ isLoadingMyStore: true });
    try {
      await myStoreApi.updateCoverImage(formData);
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response,
        }));
      }
    } finally {
      set({ isLoadingMyStore: false });
    }
  },

  updateUserProfileImage: async (formData) => {
    set({ isLoadingMyStore: true });
    try {
      await myStoreApi.updateUserProfileImage(formData);
    } catch (error) {
      if (error.response) {
        set(() => ({
          errorMyStore: error.response,
        }));
      }
    } finally {
      set({ isLoadingMyStore: false });
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
  },

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

  getCurrentFormattedDate: () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  },
});
