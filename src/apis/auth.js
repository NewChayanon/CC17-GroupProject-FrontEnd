import axios from "../config/axios";

const authApi = {};

authApi.register = (body) => axios.post("/auth", body);

authApi.getAuthUser = () => axios.get("/auth/me");

export default authApi;
