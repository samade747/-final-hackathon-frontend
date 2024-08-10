import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "90%",
    borderRadius: 0,
  },
};

const api = axios.create({
  baseURL: URL,
});

function NewCourseModal({ open, handleClose }) {
  const [courseName, setCourseName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newCourse = {
        courseName,
      };
      const res = await api.post("/course/add", newCourse);
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
      aria-labelledby="new-course-modal-title"
      aria-describedby="new-course-modal-description"
    >
      <Box sx={style}>
        <h2 id="new-course-modal-title" style={{ textAlign: "center" }}>
          NEW COURSE
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            id="courseName"
            label="Course Name"
            variant="outlined"
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default NewCourseModal;
