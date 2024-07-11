import axios from "../config/axios";

const adminApi = {};


adminApi.getAllUsers = () => axios.get("/admin/allUser");
adminApi.getAllEvents = () => axios.get("/admin/all-events");
adminApi.createMessage = (body) => axios.post("/admin/new-message", body);
adminApi.allMessage = () => axios.get("/admin/all-messages");
adminApi.allBuyer = (params) => axios.get("/admin/buyer", { params });
adminApi.allSeller = (params) => axios.get("/admin/seller", { params });
adminApi.allReport = (params) => axios.get("/admin/all-report",{params})


export default adminApi;
