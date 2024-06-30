import axios from "../config/axios";

const authApi = {};

authApi.login = (body) => axios.post("/auth/login", body);

authApi.register = (body) => axios.post("/auth/register", body);

authApi.getAuthUser = () => axios.get("/user/me");

authApi.getNearMe = () => axios.get("/auth/near-me");

export default authApi;
