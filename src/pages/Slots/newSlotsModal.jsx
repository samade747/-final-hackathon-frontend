import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const api = axios.create({
  baseURL: URL,
});

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
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  pt: 2,
  px: 4,
  pb: 3,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "@media (max-width: 768px)": {
    width: "100%",
    borderRadius: 0,
  },
};

function NewSlotsModal({ open, handleClose }) {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [batchNumber, setBatchNumber] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [days, setDays] = useState("");
  const [teacherId, setTeacherId] = useState(null);

  // fetch courses
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

  const handleSubmit = (event) => {
    event.preventDefault();
    addSlot();
  };

  const addSlot = async () => {
    try {
      // convert days to array
      const daysArray = days.split(",").map((day) => day.trim());

      // make a slot id of 6 digits
      const slotId = Math.floor(100000 + Math.random() * 900000);
      const slotObj = {
        courseName,
        batchNumber,
        startTime,
        endTime,
        days: daysArray,
        teacherId,
        slotId,
      };
      console.log(slotObj);
      const res = await api.post("/slot/add", slotObj);
      console.log(res.data.data);
      handleClose(); // close the modal after successful addition
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">NEW SLOT</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              onChange={(e) => setCourseName(e.target.value)}
              labelId="course-label"
              id="course"
              label="Course"
              defaultValue=""
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
            fullWidth
            margin="normal"
            id="batchNumber"
            label="Batch Number"
            type="number"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            id="startTime"
            label="Start Time"
            type="time"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            id="endTime"
            label="End Time"
            type="time"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setDays(e.target.value)}
            fullWidth
            margin="normal"
            id="days"
            placeholder="Monday,Wednesday,Friday"
            label="Days"
            type="text"
            variant="outlined"
          />

          <TextField
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
              Add Slot
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewSlotsModal;
