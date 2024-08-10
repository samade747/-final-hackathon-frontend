import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import Format from "date-fns/format";
import { useState, useEffect } from "react";

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

const api = axios.create({
  baseURL: URL,
});

function BatchModal({ open, handleClose, dataItem }) {
  const [courseName, setCourseName] = useState(dataItem?.CourseName || "");
  const [batchNumber, setBatchNumber] = useState(dataItem?.BatchNumber || "");
  const [startedFrom, setStartedFrom] = useState(
    dataItem?.StartedFrom
      ? Format(new Date(dataItem.StartedFrom), "yyyy-MM-dd")
      : ""
  );
  const [endDate, setEndDate] = useState(
    dataItem?.EndDate ? Format(new Date(dataItem.EndDate), "yyyy-MM-dd") : ""
  );
  const [fetchcourse, setFetchCourse] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const res = await api.get("/course");
        setFetchCourse(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCourses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const batchobj = {
        courseName: courseName,
        batchNumber: batchNumber,
        startedFrom: startedFrom,
        endDate: endDate,
      };

      const res = await api.put("/batch/update/" + dataItem._id, batchobj);
      console.log(res.data);
      handleClose();
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
        <h2 id="child-modal-title">EDIT BATCH</h2>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              value={courseName}
              labelId="course-label"
              id="course"
              label="Course"
              onChange={(e) => setCourseName(e.target.value)}
            >
              {fetchcourse.map((course, index) => (
                <MenuItem key={index} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            onChange={(e) => setBatchNumber(e.target.value)}
            fullWidth
            value={batchNumber}
            margin="normal"
            id="batchNumber"
            label="Batch Number"
            type="number"
            variant="outlined"
          />

          <TextField
            onChange={(e) => {
              setStartedFrom(e.target.value);
            }}
            fullWidth
            value={startedFrom}
            margin="normal"
            id="startedFrom"
            label="Started From"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            value={endDate}
            margin="normal"
            id="endDate"
            label="End Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default BatchModal;
