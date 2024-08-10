import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl, Input } from "@mui/material";
import { useState, useEffect } from "react";
import { URL } from "../../Utils/url.js";
import axios from "axios";

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

function ChildModal({ open, handleClose, student }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState(student.FullName || "");
  const [email, setEmail] = useState(student.Email || "");
  const [fatherEmail, setFatherEmail] = useState(student.FatherEmail || "");
  const [phoneNumber, setPhoneNumber] = useState(student.PhoneNumber || "");
  const [batchNumber, setBatchNumber] = useState(student.BatchNumber || "");
  const [courseName, setCourseName] = useState(student.CourseName || "");
  const [slotId, setSlotId] = useState(student.SlotId || "");
  const [rollNumber, setRollNumber] = useState(student.RollNumber || "");
  const [fetchcourse, setFetchCourse] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const studentobj = {
        fullName: fullName,
        email: email,
        fatherEmail: fatherEmail,
        phoneNumber: phoneNumber,
        batchNumber: batchNumber,
        courseName: courseName,
        slotId: slotId,
        rollNumber: rollNumber,
      };

      const res = await api.put("/student/update/" + student._id, studentobj);
      console.log(res.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCourses = async () => {
    try {
      const res = await api.get("/course");
      setFetchCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">EDIT STUDENT</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={fullName}
            fullWidth
            margin="normal"
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            value={email}
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={fatherEmail}
            fullWidth
            margin="normal"
            id="fatherEmail"
            label="Father Email"
            type="email"
            variant="outlined"
            onChange={(e) => setFatherEmail(e.target.value)}
          />
          <TextField
            value={phoneNumber}
            fullWidth
            margin="normal"
            id="phoneNumber"
            label="Phone Number"
            type="number"
            variant="outlined"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            value={batchNumber}
            fullWidth
            margin="normal"
            id="batch"
            label="Batch Number"
            type="number"
            variant="outlined"
            onChange={(e) => setBatchNumber(e.target.value)}
          />
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
            value={slotId}
            fullWidth
            margin="normal"
            id="slot"
            label="Slot"
            type="number"
            variant="outlined"
            onChange={(e) => setSlotId(e.target.value)}
          />
          <TextField
            value={rollNumber}
            fullWidth
            margin="normal"
            id="rollNumber"
            label="Roll Number"
            type="number"
            variant="outlined"
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <Input
              id="profile-picture"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile-picture">
              <Button component="span" variant="outlined">
                Upload Image
              </Button>
            </label>
            {profilePicture && (
              <span style={{ marginLeft: "1em" }}>{profilePicture.name}</span>
            )}
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update Student
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ChildModal;
