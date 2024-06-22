import axios from "../config/axios";

const authApi = {};

authApi.register = (body) => axios.post("/auth", body);

export default authApi;
