import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../Utils/url";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Box, Button, TextField } from "@mui/material";
import "./courses.scss";

const api = axios.create({
  baseURL: URL,
});

const EditCoursesModal = ({ open, handleClose, course }) => {
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    if (course) {
      setCourseName(course.CourseName); // CourseName ensure karega ke aap correctly use kar rahe hain
    }
  }, [course]);

  const handleUpdateCourse = async () => {
    try {
      const res = await api.put(`/course/update/${course._id}`, { courseName });
      toast.success(res.data.message);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error updating course");
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            fullWidth
            label="Edit Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            margin="normal"
          />
          <Button
            onClick={handleUpdateCourse}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Update Course
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Cancel
          </Button>
          <ToastContainer />
        </Box>
      </Modal>
    </>
  );
};

export default EditCoursesModal;
