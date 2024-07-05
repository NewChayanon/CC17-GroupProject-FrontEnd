import axios from "../config/axios";

const storeApi = {};
storeApi.getStoreByIdAnonymous = (storeId) =>
  axios.get(`auth/storeProfile/${storeId}`);
// storeApi.getStoreByIdLoggedIn = (storeId) => axios.get(`user/storeProfile/${storeId}`);
storeApi.getStoreByIdLoggedIn = (storeId) =>
  axios.get(`user/storeProfile/${storeId}`);
storeApi.toggleFollowStoreById = (storeId) =>
  axios.put(`user/follow/${storeId}`);
storeApi.reviewStore = (storeId, data) =>
  axios.post(`/user/comment/${storeId}`, data);
storeApi.reportStore = (storeId, formData) =>
  axios.post(`user/report/${storeId}`, formData);

export default storeApi;
