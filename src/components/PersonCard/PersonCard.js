import React, { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export default function PersonCard({ person }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPerson, setEditedPerson] = useState(person); // State to track edited person details

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDialogClose = () => {
    handleClose();
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server to delete the connection
      await axios.delete("/api/getConnections", { data: { id: person._id } });
      handleClose();
      window.location.reload(); // Refresh the home page
    } catch (error) {
      console.error("Failed to delete connection:", error);
      // Handle error condition, such as showing an error message
      // showErrorMessage("Failed to delete connection");
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
      // Send a PUT request to update the connection
      await axios.put(`/api/updateConnection/${person._id}`, editedPerson);
      handleClose();
      window.location.reload(); // Refresh the home page
    } catch (error) {
      console.error("Failed to update connection:", error);
      // Handle error condition, such as showing an error message
      // showErrorMessage("Failed to update connection");
    }
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
          <p className="text-green-500">Value: {person.value}</p>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={handleDialogClose}
        className="person-card-modal" // Custom class name for the dialog
        PaperProps={{
          style: {
            width: "600px", // Adjust the width as per your requirements
            height: "400px", // Adjust the height as per your requirements
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
            label="Contact"
            name="contact"
            value={editedPerson.contact}
            onChange={handleInputChange}
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
            label="Value"
            name="value"
            value={editedPerson.value}
            onChange={handleInputChange}
            type="number"
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
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
