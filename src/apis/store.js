import axios from "../config/axios";

const storeApi= {};
storeApi.getStoreByIdAnonymous = (storeId) => axios.get(`auth/${storeId}`);
// storeApi.getStoreByIdLoggedIn = (storeId) => axios.get(`user/storeProfile/${storeId}`);
storeApi.getStoreByIdLoggedIn = (storeId) => axios.get(`user/${storeId}`);
// storeApi.toggleFolloeStoreById = (storeId) =>
//   axios.put(`user/interested/${eventId}`);

export default storeApi;

