import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { markAttendance } from '../../redux/actions/attendanceActions';

const Attendance = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    timeSlotId: '',
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(markAttendance(formData.studentId, formData.timeSlotId));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Student ID</label>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Time Slot ID</label>
        <input
          type="text"
          name="timeSlotId"
          value={formData.timeSlotId}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Mark Attendance</button>
    </form>
  );
};

export default Attendance;
