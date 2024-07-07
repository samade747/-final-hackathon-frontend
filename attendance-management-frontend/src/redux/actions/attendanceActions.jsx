import { MARK_ATTENDANCE } from './types';
import attendanceService from '../../api/attendance';

export const markAttendance = (studentId, timeSlotId) => async (dispatch) => {
  try {
    const response = await attendanceService.markAttendance(studentId, timeSlotId);

    dispatch({
      type: MARK_ATTENDANCE,
      payload: { attendance: response.data },
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
