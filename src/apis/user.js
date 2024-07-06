import axios from "../config/axios";

const userApi = {};
userApi.getInterestedEvent = () => axios.get("user/event");
userApi.getCollectedCoupon = () => axios.get("user/coupon-list");
userApi.useCoupon = (voucherItemId) => axios.patch(`user/use/${voucherItemId}`);

userApi.changeInfoSettings = (formData) =>
  axios.patch("user/change-info", formData);

// storeApi.getStoreByIdAnonymous = (storeId) =>
//   axios.get(`auth/storeProfile/${storeId}`);
// // storeApi.getStoreByIdLoggedIn = (storeId) => axios.get(`user/storeProfile/${storeId}`);
// storeApi.getStoreByIdLoggedIn = (storeId) =>
//   axios.get(`user/storeProfile/${storeId}`);
// storeApi.toggleFollowStoreById = (storeId) =>
//   axios.put(`user/follow/${storeId}`);
// storeApi.reviewStore = (storeId, data) =>
//   axios.post(`/user/comment/${storeId}`, data);
// storeApi.reportStore = (storeId, formData) =>
//   axios.post(`user/report/${storeId}`, formData);

export default userApi;
