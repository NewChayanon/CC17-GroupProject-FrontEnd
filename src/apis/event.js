import axios from "../config/axios";

const eventApi = {};
eventApi.getEventById = (eventId) => axios.get(`user/event/${eventId}`);

export default eventApi;
