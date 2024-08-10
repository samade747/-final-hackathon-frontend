import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

const ViewSlot = () => {
  const location = useLocation();
  const { slot } = location.state || {}; // Destructure slot from location.state
  console.log(slot);
  const [teacher, setTeacher] = useState({});

  return (
    <div className="view-slot-container">
      <div className="view-slot-header">
        <h2>Slot</h2>
        <button className="close-btn">
          <Link to="/" className="view-slot-link">
            <MdOutlineClose className="close" size={24} />
          </Link>
        </button>
      </div>
      <div className="view-slot-body">
        <div className="slot-details">
          <div className="detail-item">
            <label>Course Name:</label>
            <span> {slot?.CourseName}</span>
          </div>
          <div className="detail-item">
            <label>Batch Number:</label>
            <span> {slot?.BatchNumber}</span>
          </div>
          <div className="detail-item">
            <label>Days:</label>
            <span> {slot?.Days.join(", ")}</span>
          </div>
          <div className="detail-item">
            <label>Start Time:</label>
            <span> {slot?.StartTime}</span>
          </div>
          <div className="detail-item">
            <label>End Time:</label>
            <span> {slot?.EndTime}</span>
          </div>
          <div className="detail-item">
            <label>Slot Id:</label>
            <span> {slot?.SlotId}</span>
          </div>
          <div className="detail-item">
            <label>Total Students:</label>
            <span> {slot?.StudentsId.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSlot;
