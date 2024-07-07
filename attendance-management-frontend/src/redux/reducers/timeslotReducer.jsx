import { GET_TIMESLOTS } from '../actions/types';

const initialState = {
  timeslots: [],
};

const timeslotReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMESLOTS:
      return {
        ...state,
        timeslots: payload.timeslots,
      };
    default:
      return state;
  }
};

export default timeslotReducer;
