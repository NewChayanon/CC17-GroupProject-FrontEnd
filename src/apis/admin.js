import axios from "../config/axios";

const adminApi = {}

adminApi.createMessage = (body) => axios.post('/admin/new-message',body)
adminApi.allMessage = () => axios.get("/admin/all-messages")
adminApi.allBuyer = (params)=> axios.get("/admin/buyer", {params})
adminApi.allSeller = (params) => axios.get("/admin/seller",{params})
adminApi.allReport = (params) => axios.get("/admin/all-report",{params})

export default adminApi;