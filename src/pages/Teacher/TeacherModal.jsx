import * as React from "react";
import { useEffect } from "react";
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

function Teacher({ open, handleClose, dataItem }) {
  console.log(dataItem);
  const [fetchcourse, setFetchCourse] = React.useState([]);
  const [courseName, setCourseName] = React.useState([]);
  const [email, setEmail] = React.useState(dataItem.Email || "");
  const [phoneNumber, setPhoneNumber] = React.useState(
    dataItem.PhoneNumber || ""
  );
  const [teacherId, setTeacherId] = React.useState(dataItem.TeacherId || "");
  const [teacherOf, setTeacherOf] = React.useState(dataItem.TeacherOf || "");
  const [teacherName, setTeacherName] = React.useState(
    dataItem.TeacherName || ""
  );

  const api = axios.create({
    baseURL: URL,
  });

  const getAllCourses = async () => {
    try {
      const res = await api.get("/course");
      setFetchCourse(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const teacherObj = {
        teacherName: teacherName, // Correctly assign the state value
        email: email, // Correctly assign the state value
        phoneNumber: phoneNumber, // Correctly assign the state value
        teacherOf: teacherOf, // Correctly assign the state value
        teacherId: teacherId, // Correctly assign the state value
      };
      console.log(teacherObj);

      const res = await api.put("/teacher/update/" + dataItem._id, teacherObj);
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
        <h2 id="child-modal-title">EDIT TEACHER</h2>
        <form onSubmit={handleClick}>
          <TextField
            onChange={(e) => setTeacherName(e.target.value)}
            value={teacherName}
            fullWidth
            margin="normal"
            id="fullName"
            label="Teacher Name"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            type="email"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            fullWidth
            margin="normal"
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setTeacherId(e.target.value)}
            value={teacherId}
            fullWidth
            margin="normal"
            id="phoneNumber"
            label="Teacher Id"
            type="number"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              defaultValue={teacherOf}
              labelId="course-label"
              id="course"
              label="Course"
              onChange={(e) => setTeacherOf(e.target.value)}
            >
              {fetchcourse.map((course, index) => (
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
              Updated
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default Teacher;
