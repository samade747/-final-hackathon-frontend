import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl, Input } from "@mui/material";
import { URL } from "../../Utils/url";
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
  // border: "2px solid #000",
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

function NewTeacherModal({ open, handleClose }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [Courses, setCourses] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [teacherOf, setTeacherOf] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const HandleAddTeacher = async () => {
    const TeacherObj = {
      teacherName,
      email,
      phoneNumber,
      teacherOf,
      teacherId,
      profilePicture,
    };
    console.log(TeacherObj);

    try {
      const res = await api.post("/teacher/add", TeacherObj);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCourses = async () => {
    const res = await api.get("/course");
    setCourses(res.data.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);

    // Handle image upload
    const url = await useUploadImage(file, `${Date.now()}-${file.name}`);
    console.log(url);
    setProfilePicture(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with all data including profilePicture
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">NEW TEACHER</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setTeacherName(e.target.value)}
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
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            variant="outlined"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            id="TeacherID"
            label="Teacher ID"
            variant="outlined"
            onChange={(e) => setTeacherId(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              label="Course"
              defaultValue=""
              onChange={(e) => setTeacherOf(e.target.value)}
            >
              {Courses.map((course, index) => (
                <MenuItem key={index} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Input
              id="profile-picture"
              type="file"
              accept="image/*"
              style={{ display: "none" }} // Hide the file input
              onChange={handleImageChange}
            />
            <label htmlFor="profile-picture">
              <Button component="span" variant="outlined">
                upload image
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
            <Button
              type="submit"
              variant="contained"
              onClick={HandleAddTeacher}
            >
              Add Student
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewTeacherModal;
