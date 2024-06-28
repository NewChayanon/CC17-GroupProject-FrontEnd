import eventApi from "../../apis/event";

const initialState = {
  eventId: 0,
  selectedEventDetails: null,
};

export const createEventSlice = (set) => ({
  ...initialState,
  setEventId: (eventId) => {
    set(() => ({
      eventId: eventId,
    }));
  },
  setSelectedEventDetails: async (eventId) => {
    try {
      console.log("inside setselectedeventdetails"); // ตรงนี้ run แล้ว
      const result = await eventApi.getEventById(eventId);
      console.log("result from getting event details", result.data); // run แล่้ว ได่
      // เรียก update eventDetail
      set(() => {
        selectedEventDetails: result.data;
      });
    } catch (err) {
      console.log("error from fetching event details", err);
    }
  },
});
