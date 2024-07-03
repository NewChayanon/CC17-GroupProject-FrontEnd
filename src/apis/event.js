import axios from "../config/axios";

const eventApi = {};
// get event details สำหรับ user ที่ไม่ login
eventApi.getEventByIdAnonymous = (eventId) => axios.get(`auth/event/${eventId}`);
// get event details สำหรับ user ที่ login
eventApi.getEventByIdLoggedIn = (eventId) => axios.get(`user/event/${eventId}`)

eventApi.toggleInterestEventById = (eventId) =>
  axios.put(`user/interested/${eventId}`);
  
eventApi.getCoupon = (eventId) => axios.post(`user/keep-coupon/${eventId}`)
export default eventApi;
