import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import Format from "date-fns/format";

const api = axios.create({
  baseURL: URL,
});

const ViewBatch = () => {
  const location = useLocation();
  const { slot } = location.state || {}; // Destructure slot from location.state
  const { batch } = location.state; // Destructure slot from location.state
  console.log(batch);
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
            <label>Batch Number:</label>
            <span> {batch?.BatchNumber}</span>
          </div>
          <div className="detail-item">
            <label>Course Name:</label>
            <span> {batch?.CourseName}</span>
          </div>
          <div className="detail-item">
            <label>Started From:</label>
            <span>
              {" "}
              {batch?.StartedFrom
                ? Format(new Date(batch?.StartedFrom), "yyyy-MM-dd")
                : "N/A"}
            </span>
          </div>
          <div className="detail-item">
            <label>End Time:</label>
            <span>
              {" "}
              {batch?.EndDate
                ? Format(new Date(batch?.EndDate), "yyyy-MM-dd")
                : "N/A"}
            </span>
          </div>
          <div className="detail-item">
            <label>Total Slots:</label>
            <span>
              {" "}
              {batch?.Slots ? batch?.Slots.length : "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBatch;
