import axios from 'axios';

const API_URL = '/api/timeslots/';

const getAllTimeSlots = () => {
  return axios.get(API_URL);
};

const timeSlotService = {
  getAllTimeSlots,
};

export default timeSlotService;
