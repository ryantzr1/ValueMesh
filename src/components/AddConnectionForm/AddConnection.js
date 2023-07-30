import React, { useState } from "react";
import { Fab, Modal, Box } from "@mui/material";
import ConnectionForm from "./ConnectionForm";

function AddConnection() {
  const [open, setOpen] = useState(false);

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
          fontSize: "3rem",
          width: "80px",
          height: "80px",
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
        <ConnectionForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default AddConnection;
