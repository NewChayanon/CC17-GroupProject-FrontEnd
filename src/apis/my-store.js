import axios from "../config/axios";

const myStoreApi = {};

myStoreApi.getMyStore = () => axios.get("/user/store-main-page");

export default myStoreApi;
