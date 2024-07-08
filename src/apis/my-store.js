import axios from "../config/axios";

const myStoreApi = {};

myStoreApi.getMyStore = () => axios.get("/user/store-main-page");

myStoreApi.getEventDetailByEventId = (eventId) =>
  axios.get(`/user/store-main-page/${eventId}`);

myStoreApi.editEvent = (eventId, body) =>
  axios.patch(`/user/edit-event/${eventId}`, body);

export default myStoreApi;
