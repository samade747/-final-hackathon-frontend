import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl, Input } from "@mui/material";
import { URL } from "../../Utils/url.js";
import axios from "axios";
import useUploadImage from "../../Custom Hooks/useUploadImage.jsx";

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

function NewStudentModal({ open, handleClose }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [slotId, setSlotId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [fetchcourse, setFetchCourse] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);

    const url = await useUploadImage(file, `${Date.now()}-${file.name}`);
    console.log(url);

    setProfilePicture(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const studentobj = {
        fullName,
        email,
        fatherEmail,
        phoneNumber,
        batchNumber,
        courseName,
        slotId: slotId,
        rollNumber,
        profilePicture: profilePicture,
      };

      const res = await api.post("/student/add", studentobj);
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
        <h2 id="child-modal-title">NEW STUDENT</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="fatherEmail"
            label="Father Email"
            type="email"
            variant="outlined"
            onChange={(e) => setFatherEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="phoneNumber"
            label="Phone Number"
            type="number"
            variant="outlined"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
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
              labelId="course-label"
              id="course"
              label="Course"
              defaultValue=""
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
            fullWidth
            margin="normal"
            id="slot"
            label="slot"
            type="text"
            variant="outlined"
            onChange={(e) => setSlotId(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="slot"
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
              Add Student
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewStudentModal;
