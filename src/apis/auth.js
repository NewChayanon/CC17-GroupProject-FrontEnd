import axios from "../config/axios";

const authApi = {};

authApi.login = (body) => axios.post("/auth/login", body);

authApi.getAuthUser = () => axios.get("/user/me");

export default authApi;
