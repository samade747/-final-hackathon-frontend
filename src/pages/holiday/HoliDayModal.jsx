import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { URL } from "../../Utils/url";

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

function HolidayModal({ open, handleClose, data }) {
  const [name, setName] = React.useState(data.Name);
  const [date, setDate] = React.useState(data.Date.slice(0, 10));

  const handleSubmit = async (slotObj) => {
    const updatedData = {
      name: name,
      date: date,
    };
    try {
      const res = await api.put("/holiday/update/" + data._id, updatedData);
      console.log(res.data.data);
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
        <h2 id="child-modal-title">EDIT HOLIDAY</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            id="holidayName"
            label="Holiday Name"
            variant="outlined"
          />

          <TextField
            value={date}
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
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default HolidayModal;
