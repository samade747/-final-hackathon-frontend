import { GET_TIMESLOTS } from './types';
import timeSlotService from '../../api/timeslot';

export const getAllTimeSlots = () => async (dispatch) => {
  try {
    const response = await timeSlotService.getAllTimeSlots();

    dispatch({
      type: GET_TIMESLOTS,
      payload: { timeslots: response.data },
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
