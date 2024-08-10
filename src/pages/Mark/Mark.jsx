import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { toast } from "react-toastify";
import AreaTop from "../../components/dashboard/areaTop/AreaTop.jsx";

const api = axios.create({
  baseURL: URL,
});

const Mark = () => {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [rollNumber, setRollNumber] = useState(null);

  const markAttendance = async () => {
    console.log("Roll Number:", rollNumber);
    if (!rollNumber) {
      setError(true);
      setMessage("Please enter a Roll Number !");
      return;
    }

    try {
      const res = await api.post("/attendance/markattendance", {
        rollNumber: rollNumber,
      });
      console.log(res.data);
      setError(false);
      setMessage(res.data.message);
      setOpen(true);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message);
      setOpen(true);
      setError(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AreaTop title="Mark Attendance" />
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 8,
            bgcolor: "background.paper",
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error: Please enter a valid numeric ID to mark attendance.
            </Alert>
          )}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 3 }}
            style={{ textAlign: "center" }}
          >
            Mark Attendance
          </Typography>
          <TextField
            label="ID"
            type="text"
            variant="outlined"
            fullWidth
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={markAttendance}
            style={{display: "block", margin: "auto"}}
            sx={{ textTransform: "none", mb: 2 }}
          >
            Mark Attendance
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{message}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Mark;
