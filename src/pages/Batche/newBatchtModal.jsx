import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { Select, InputLabel, FormControl } from "@mui/material";
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

function NewBatchModal({ open, handleClose }) {
  const [batchNumber, setBatchNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [startedFrom, setStartedFrom] = useState("");
  const [endDate, setEndDate] = useState("");
  const [getcourse, setgetcourse] = useState([]);
  const [error, setError] = useState("");
  const [batch, setBatch] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!batchNumber || !courseName || !startedFrom || !endDate) {
      setError("All Fields are required");
      return;
    }
    setError(""); // Clear previous errors
    try {
      const AddBatch = { batchNumber, courseName, startedFrom, endDate };
      const res = await api.post("/batch/add", AddBatch);
      console.log(res.data);
      setBatch(res.data.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the batch. Please try again.");
    }
  };

  const getcourses = async () => {
    try {
      const res = await api.get("/course");
      console.log(res.data.data);
      setgetcourse(res.data.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    getcourses();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">NEW BATCH</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="batch"
            label="Batch"
            type="number"
            variant="outlined"
            onChange={(e) => setBatchNumber(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="startDate"
            type="date"
            variant="outlined"
            onChange={(e) => setStartedFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="endDate"
            type="date"
            variant="outlined"
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              label="Course"
              defaultValue=""
              onChange={(e) => setCourseName(e.target.value)}
            >
              {getcourse?.map((course, index) => (
                <MenuItem key={index} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Batch
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewBatchModal;
