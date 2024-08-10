import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

const ViewStudent = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Destructure student from location.state
  console.log(student);
  const [slot, setSlot] = useState(null);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    console.log("Received student data: ", student);
    if (student?.SlotId) {
      fetchSlot(student.SlotId);
    }
  }, [student]);

  const fetchSlot = async (slotId) => {
    try {
      // Assuming slotId is in the correct format
      const response = await api.get(`/slot/${slotId}`);
      console.log("Fetched slot data: ", response.data.data);
      setSlot(response.data.data);
      // if (response.data.data?.TeacherId) {
      //   fetchTeacher(response.data.data.TeacherId);
      // }
    } catch (error) {
      console.error("Error fetching slot data: ", error.message);
    }
  };

  if (!student) {
    return <div>No student data found</div>;
  }

  return (
    <div className="view-student-container">
      <div className="view-student-header">
        <h2>Student Profile</h2>
        <button className="close-btn">
          <Link to="/" className="view-student-link">
            <MdOutlineClose className="close" size={24} />
          </Link>
        </button>
      </div>
      <div className="view-student-body">
        <div className="profile-picture">
          <img
            src={student.ProfilePicture || "/public/user.webp"}
            alt="Profile"
          />
        </div>
        <div className="student-details">
          <div className="detail-item">
            <label>Name:</label>
            <span> {student.FullName}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span> {student.Email}</span>
          </div>
          <div className="detail-item">
            <label>Phone Number:</label>
            <span> {student.PhoneNumber}</span>
          </div>
          <div className="detail-item">
            <label>Father Email:</label>
            <span> {student.FatherEmail}</span>
          </div>
          <div className="detail-item">
            <label>Course Name:</label>
            <span> {student.CourseName}</span>
          </div>
          <div className="detail-item">
            <label>Batch Number:</label>
            <span> {student.BatchNumber}</span>
          </div>
          <div className="detail-item">
            <label>Present Days:</label>
            <span> {student.PresentDays}</span>
          </div>
          <div className="detail-item">
            <label>Absent Days:</label>
            <span> {student.AbsentDays}</span>
          </div>
          <div className="detail-item">
            <label>Total Days:</label>
            <span> {student.TotalDays}</span>
          </div>
          {slot && (
            <>
              <div className="detail-item">
                <label>Days:</label>
                <span> {slot.Days.join(", ")}</span>
              </div>
              <div className="detail-item">
                <label>Start Time:</label>
                <span> {slot.StartTime}</span>
              </div>
              <div className="detail-item">
                <label>End Time:</label>
                <span> {slot.EndTime}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
