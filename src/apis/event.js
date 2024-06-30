import axios from "../config/axios";

const eventApi = {};
eventApi.getEventById = (eventId) => axios.get(`auth/event/${eventId}`);
eventApi.toggleInterestEventById = (eventId) =>
  axios.put(`user/interested/${eventId}`);

export default eventApi;
