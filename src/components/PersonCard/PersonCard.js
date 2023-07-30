import React, { useState, useEffect } from "react";
import axios from "axios";
import TagInput from "../AddConnectionForm/TagInput";
import { copyToClipboard } from "../../utils/copyToClipboard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import QRCode from "qrcode.react";

export default function PersonCard({ person }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPerson, setEditedPerson] = useState({
    ...person,
    tags: person.tags ?? [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [qrCodeOpen, setQRCodeOpen] = useState(false);
  const [qrCodeLink, setQRCodeLink] = useState("");

  useEffect(() => {
    if (person) {
      setEditedPerson({
        ...person,
        tags: person.tags ?? [],
      });
      setTagInput(person.tags ? person.tags.join(", ") : "");
    }
  }, [person]);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleOpenQRCode = () => {
    const shareableLink = getShareableLink();
    setQRCodeOpen(true);
    setQRCodeLink(shareableLink);
  };

  const handleCloseQRCode = () => {
    setQRCodeOpen(false);
  };

  const handleTagInput = (newTags) => {
    setEditedPerson((prevPerson) => ({
      ...prevPerson,
      tags: newTags,
    }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/getConnections", { data: { id: person._id } });
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete connection:", error);
    }
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
      await axios.put(`/api/updateConnection/${person._id}`, editedPerson);
      handleClose();
      window.location.reload();
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
        className="card bg-white shadow-sm rounded-lg p-6"
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
          <TagInput value={editedPerson.tags} onChange={handleTagInput} />
          <TextField
            label="Linkedin Account"
            name="linkedin"
            value={editedPerson.linkedin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact"
            name="contact"
            value={editedPerson.contact}
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
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
          <Button onClick={handleCopyLink}>Copy Shareable Link</Button>
          <Button onClick={handleOpenQRCode}>Show QR Code</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={qrCodeOpen}
        onClose={handleCloseQRCode}
        className="qr-code-modal"
        PaperProps={{
          style: {
            width: "350px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <DialogTitle>Scan this QR code</DialogTitle>
        <QRCode value={qrCodeLink} size={300} />
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
