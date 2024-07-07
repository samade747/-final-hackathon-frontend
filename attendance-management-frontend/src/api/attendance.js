import axios from 'axios';

const API_URL = '/api/attendance/';

const markAttendance = (studentId, timeSlotId) => {
  return axios.post(API_URL, {
    studentId,
    timeSlotId,
  });
};

const attendanceService = {
  markAttendance,
};

export default attendanceService;
