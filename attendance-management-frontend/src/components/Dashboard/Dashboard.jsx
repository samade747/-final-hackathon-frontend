import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimeSlots } from '../../redux/actions/timeslotActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslots.timeslots);

  useEffect(() => {
    dispatch(getAllTimeSlots());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {timeslots.map((slot) => (
          <li key={slot._id}>{slot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
