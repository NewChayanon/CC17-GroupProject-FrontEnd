import axios from "../config/axios";

const myStoreApi = {};

myStoreApi.getMyStore = () => axios.get("/user/store-main-page");

myStoreApi.getEventDetailByEventId = (eventId) =>
  axios.get(`/user/store-main-page/${eventId}`);

myStoreApi.getAllEventList = () => axios.get("/user/my-event");

myStoreApi.editEvent = (eventId, body) =>
  axios.patch(`/user/edit-event/${eventId}`, body);

myStoreApi.getMyStoreInfo = () => axios.get("/user/my-store-profile");

myStoreApi.editStoreDescription = (formData) =>
  axios.patch("mystore/edit-description-store", formData);

export default myStoreApi;
