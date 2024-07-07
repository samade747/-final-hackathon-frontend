import { MARK_ATTENDANCE } from '../actions/types';

const initialState = {
  attendance: [],
};

const attendanceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MARK_ATTENDANCE:
      return {
        ...state,
        attendance: [...state.attendance, payload.attendance],
      };
    default:
      return state;
  }
};

export default attendanceReducer;
