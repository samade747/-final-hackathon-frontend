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
  width: 750,
  // height: "80vh",
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

function NewHolidayModal({ open, handleClose }) {
  const [holidayName, setHolidayName] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(holidayName, date);

    try {
      const holidayObj = {
        name: holidayName,
        date: date,
      };
      console.log(holidayObj);
      const res = await api.post("/holiday/add", holidayObj);
      console.log(res.data.data);
      handleClose(); // close the modal after successful addition
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
        <h2 id="child-modal-title">NEW HOLIDAY</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setHolidayName(e.target.value)}
            fullWidth
            margin="normal"
            id="holidayName"
            label="Holiday Name"
            variant="outlined"
          />

          <TextField
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            id="date"
            label="Date"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Holiday
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewHolidayModal;
