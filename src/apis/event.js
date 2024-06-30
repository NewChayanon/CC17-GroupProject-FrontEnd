import axios from "../config/axios";

const eventApi = {};
eventApi.getEventById = (eventId) => axios.get(`auth/event/${eventId}`);
eventApi.toggleInterestEventById = (eventId) =>
  axios.put(`user/interested/${eventId}`);
eventApi.getCoupon = (eventId) => axios.post(`user/keep-coupon/${eventId}`)
export default eventApi;
