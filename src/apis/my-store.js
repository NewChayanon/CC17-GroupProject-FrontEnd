import axios from "../config/axios";

const myStoreApi = {};

myStoreApi.getMyStore = () => axios.get("/user/store-main-page");

myStoreApi.getEventDetailByEventId = (eventId) => axios.get(`/user/store-main-page/${eventId}`);

myStoreApi.getAllEventList = () => axios.get("/user/my-event");

myStoreApi.editEvent = (eventId, body) => axios.patch(`/user/edit-event/${eventId}`, body);

myStoreApi.getMyStoreInfo = () => axios.get("/user/my-store-profile");

myStoreApi.editStoreDescription = (body) => axios.patch("user/edit-description-store", body);

myStoreApi.updateCoverImage = (formData) => axios.patch("user/update-coverImage", formData);

myStoreApi.updateUserProfileImage = (formData) => axios.patch("user/store-profile-page/edit-user-profile-image", formData);

myStoreApi.addMoreProduct = (formData) => axios.post("user/create-product", formData);

export default myStoreApi;
