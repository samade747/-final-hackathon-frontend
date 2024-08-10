import React from "react";
import { Link, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { MdOutlineClose } from "react-icons/md";

const ViewTeacher = ({ student }) => {
  const location = useLocation();
  const { teacher } = location.state || {};
  console.log(teacher);
  // Sample student data

  return (
    <div className="view-student-container">
      <div className="view-student-header">
        <h2>Teacher Profile</h2>
        <button className="close-btn">
          <Link to="/" className="view-student-link">
            <MdOutlineClose className="close" size={24} />
          </Link>
        </button>
      </div>
      <div className="view-student-body">
        <div className="profile-picture">
          <img src={teacher?.ProfilePicture || "/public/user.webp"} alt="" />
        </div>
        <div className="student-details">
          <div className="detail-item">
            <label>Name: </label>
            <span> {teacher?.TeacherName}</span>
          </div>

          <div className="detail-item">
            <label>Email: </label>
            <span> {teacher?.Email}</span>
          </div>
          <div className="detail-item">
            <label>Phone Number: </label>
            <span> {teacher?.PhoneNumber}</span>
          </div>

          <div className="detail-item">
            <label>Teacher Id: </label>
            <span> {teacher?.TeacherId}</span>
          </div>
          <div className="detail-item">
            <label>Teacher of: </label>
            <span> {teacher?.TeacherOf}</span>
          </div>
          <div className="detail-item">
            <label>Total Slots: </label>
            <span> {teacher?.Slots.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacher;
