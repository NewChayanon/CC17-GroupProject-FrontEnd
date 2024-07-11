import axios from "../config/axios";

const adminApi = {};

adminApi.getAllUsers = () => axios.get("/admin/allUser");
adminApi.getAllEvents = () => axios.get("/admin/all-events");

export default adminApi;
