import React, { useState, useContext } from "react";
import { copyToClipboard } from "../../utils/copyToClipboard";
import axios from "axios";
import { useRouter } from "next/router";
import UserContext from "../../UserContext";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";

export default function SharedPersonCard({ person }) {
  const router = useRouter();
  const { user } = useContext(UserContext); // Access user context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [editedPerson, setEditedPerson] = useState({ ...person });

  const handleClickOpen = () => {
    if (user) {
      setIsModalOpen(true);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send a PUT request to update the connection
      console.log(editedPerson);

      await axios.post(`/api/updateConnection/${person._id}`, editedPerson);
      handleClose();
      router.push("/");
    } catch (error) {
      console.error("Failed to update connection:", error);
    }
  };

  const getShareableLink = () => {
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/contact/${person._id}`;
    return shareableLink;
  };

  const handleCopyLink = () => {
    const shareableLink = getShareableLink();
    copyToClipboard(shareableLink);
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <div
        className="bg-white shadow-sm rounded-lg p-6"
        onClick={handleClickOpen}
      >
        <h2 className="text-2xl font-bold mb-2">{person.name}</h2>
        {person.industry && (
          <p className="text-gray-600 mb-2">{person.industry}</p>
        )}
        {person.linkedin && (
          <p className="text-gray-600 mb-2">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Linkedin Account
            </a>
          </p>
        )}
        {person.metAt && (
          <p className="text-gray-600 mb-2">Met Through: {person.metAt}</p>
        )}
        {person.value && (
          <p className="text-green-500 mb-3">Value: {person.value}</p>
        )}
        {person.tags && (
          <p className="mb-2">
            {person.tags.map((tag) => (
              <Chip key={tag} label={tag} className="mr-1" />
            ))}
          </p>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        className="person-card-modal"
        PaperProps={{
          style: {
            width: "600px",
            height: "400px",
          },
        }}
      >
        <DialogTitle>{editedPerson.name}</DialogTitle>
        <DialogContent className="person-card-modal-content">
          <TextField
            label="Industry"
            name="industry"
            value={editedPerson.industry}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Value"
            name="value"
            value={editedPerson.value}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Linkedin Account"
            name="linkedin"
            value={editedPerson.linkedin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Met Through"
            name="metAt"
            value={editedPerson.metAt}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            name="notes"
            value={editedPerson.notes}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleCopyLink}>Copy Shareable Link</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Shareable link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}
