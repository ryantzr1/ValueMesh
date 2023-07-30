import React, { useRef, useState } from "react";
import { Fab, Button, Modal, Box, Typography } from "@mui/material";
import ConnectionForm from "./ConnectionForm";

function AddConnection() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleStartCamera = async () => {
    const constraints = { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;
    setIsCameraOn(true);
  };

  const handleCaptureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 150);
    const imageDataURL = canvasRef.current.toDataURL("image/png");
    console.log(imageDataURL);
    // Here you can send imageDataURL to the OCR service
  };

  const handleStopCamera = () => {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsCameraOn(false);
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
        <Box
          sx={{
            width: "80%",
            maxWidth: "600px",
            bgcolor: "white",
            p: "2rem",
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Add a Connection
          </Typography>
          <ConnectionForm onClose={() => setOpen(false)} />
          {!isCameraOn && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartCamera}
              fullWidth
            >
              Scan a Business Card
            </Button>
          )}
          {isCameraOn && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCaptureImage}
              fullWidth
            >
              Capture Image
            </Button>
          )}
          {isCameraOn && (
            <Button variant="outlined" onClick={handleStopCamera} fullWidth>
              Stop Camera
            </Button>
          )}
          <video
            ref={videoRef}
            autoPlay
            style={{
              display: isCameraOn ? "block" : "none",
              width: "100%",
              height: "auto",
              marginTop: "1rem",
            }}
          ></video>
          <canvas
            ref={canvasRef}
            width="300"
            height="150"
            style={{
              display: isCameraOn ? "block" : "none",
              visibility: "hidden",
            }}
          ></canvas>
        </Box>
      </Modal>
    </div>
  );
}

export default AddConnection;
