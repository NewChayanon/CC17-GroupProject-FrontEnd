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
  setSelectedEventDetails: async (eventId,isAuthenticated) => {
    try {
      let result 

    if(isAuthenticated){
      result = await eventApi.getEventByIdLoggedIn(eventId);
      console.log("result from getting event details, loggedin", result.data); // run แล่้ว ได่
    } else {
      result = await eventApi.getEventByIdAnonymous(eventId);
      console.log("result from getting event details, anonymous", result.data); // run แล่้ว ได่
    }
      
      // เรียก update eventDetail
      set(() => ({
        selectedEventDetails: result.data,
      }));
    } catch (err) {
      console.log("error from fetching event details", err);
    }
  },
});
