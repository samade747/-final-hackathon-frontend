import { combineReducers } from 'redux';
import authReducer from './authReducer';
import timeslotReducer from './timeslotReducer';
import attendanceReducer from './attendanceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  timeslots: timeslotReducer,
  attendance: attendanceReducer,
});

export default rootReducer;
