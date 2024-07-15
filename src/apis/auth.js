import axios from "../config/axios";

const authApi = {};

authApi.login = (body) => axios.post("/auth/login", body);

authApi.register = (body) => axios.post("/auth/register", body);

authApi.resetPassword = (body) => axios.patch("/auth/reset-password",body)

authApi.getAuthUser = () => axios.get("/user/me");

// authApi.getNearMe = (body) => axios.get("/auth/near-me", body);
authApi.getNearMe = (params) => axios.get("/auth/near-me", { params });

authApi.getEventBySearch = (userLocation, searchBy, searchKeyword, when) =>
  axios.get("auth/search-bar/", {
    params: {
      userLocation,
      searchBy,
      searchKeyword,
      when,
    },
  });
export default authApi;
