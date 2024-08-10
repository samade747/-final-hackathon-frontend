import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: "80vh",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  overflowY: "scroll",
  scrollbarWidth: "none", // For Firefox
  msOverflowStyle: "none", // For Internet Explorer and Edge
  pt: 2,
  px: 4,
  pb: 3,
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome, Safari, and Opera
  },
  "@media (max-width: 768px)": {
    width: "100%",
    borderRadius: 0,
  },
};

const api = axios.create({
  baseURL: URL,
});

function SlotsModal({ open, handleClose, data }) {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState(data?.CourseName || "");
  const [batchNumber, setBatchNumber] = useState(data?.BatchNumber || null);
  const [startTime, setStartTime] = useState(data?.StartTime || Date.now());
  const [endTime, setEndTime] = useState(data?.EndTime || Date.now());
  const [days, setDays] = useState(data?.Days ? data.Days.join(", ") : "");
  const [teacherId, setTeacherId] = useState(data?.TeacherId || null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/course");
        setCourses(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const updateSlot = async (slotObj) => {
    try {
      const res = await api.put("/slot/update/" + data._id, slotObj);
      console.log(res.data.data);
      handleClose(); // close the modal after successful update
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const daysArray = days.split(",").map((day) => day.trim());
    const slotObj = {
      courseName,
      batchNumber,
      startTime,
      endTime,
      days: daysArray,
      teacherId,
    };
    updateSlot(slotObj);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">EDIT SLOT</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              labelId="course-label"
              id="course"
              label="Course"
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setBatchNumber(e.target.value)}
            value={batchNumber}
            fullWidth
            margin="normal"
            id="batchNumber"
            label="Batch Number"
            type="number"
            variant="outlined"
          />
          <TextField
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            id="startTime"
            label="Start Time"
            type="time"
            variant="outlined"
          />
          <TextField
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            id="endTime"
            label="End Time"
            type="time"
            variant="outlined"
          />
          <TextField
            value={days}
            onChange={(e) => setDays(e.target.value)}
            fullWidth
            margin="normal"
            id="days"
            placeholder="Monday, Wednesday, Friday"
            label="Days"
            type="text"
            variant="outlined"
          />
          <TextField
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            fullWidth
            margin="normal"
            id="teacherId"
            label="Teacher ID"
            type="number"
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              UPDATE
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default SlotsModal;
