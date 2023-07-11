import React, { useState } from "react";
import { Fab, Button, Modal, TextField, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

function AddConnectionModal() {
  const [open, setOpen] = useState(false);
  const [connection, setConnection] = useState({
    name: "",
    industry: "",
    contact: "",
    value: "",
    linkedin: "",
    metAt: "",
    notes: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setConnection({ ...connection, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/getConnections", connection);
      router.push("/"); // Redirect to the home page
      window.location.reload(); // Refresh the home page
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        size="large"
        sx={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "3rem", // Increase font size
          width: "80px", // Increase width
          height: "80px", // Increase height
        }}
        onClick={() => setOpen(true)}
      >
        👨‍💻
      </Fab>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">Add a new connection</Typography>
          <Box mt={2} />
          <TextField
            name="name"
            label="Name"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />
          <TextField
            name="industry"
            label="industry / role"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />

          <TextField
            name="value"
            label="Value (Numbers Only)"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
            inputProps={{
              type: "number",
              min: 0,
              step: 1,
              onKeyPress: (event) => {
                const charCode = event.which ? event.which : event.keyCode;
                if (charCode === 101 || charCode === 69) {
                  event.preventDefault(); // Prevent the "e" key from being entered
                }
              },
            }}
          />
          <TextField
            name="linkedin"
            label="LinkedIn"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />
          <TextField
            name="contact"
            label="Contact"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />
          <TextField
            name="metAt"
            label="Where we met"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />
          <TextField
            name="notes"
            label="Remarks"
            fullWidth
            onChange={handleChange}
            sx={{ mt: 1, mb: 1 }}
            autoComplete="off"
          />
          <Box mt={2} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddConnectionModal;
