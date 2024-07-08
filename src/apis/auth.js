import axios from "../config/axios";

const authApi = {};

authApi.login = (body) => axios.post("/auth/login", body);

authApi.register = (body) => axios.post("/auth/register", body);

authApi.getAuthUser = () => axios.get("/user/me");

// authApi.getNearMe = (body) => axios.get("/auth/near-me", body);
authApi.getNearMe = (params) => axios.get("/auth/near-me", { params });

export default authApi;
