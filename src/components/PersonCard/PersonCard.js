import React, { useState, useEffect } from "react";
import axios from "axios";
import TagInput from "../AddConnectionForm/TagInput";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";

export default function PersonCard({ person }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPerson, setEditedPerson] = useState({
    ...person,
    tags: person.tags ?? [],
  });
  const [tagInput, setTagInput] = useState("");

  // Assuming you have a list of possible tags
  const [possibleTags, setPossibleTags] = useState([]);

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

  const handleDialogClose = () => {
    handleClose();
  };

  const handleTagInput = (newTags) => {
    setEditedPerson((prevPerson) => ({
      ...prevPerson,
      tags: newTags,
    }));
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server to delete the connection
      await axios.delete("/api/getConnections", { data: { id: person._id } });
      handleClose();
      window.location.reload(); // Refresh the home page
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
      // Send a PUT request to update the connection
      await axios.put(`/api/updateConnection/${person._id}`, editedPerson);
      handleClose();
      window.location.reload(); // Refresh the home page
    } catch (error) {
      console.error("Failed to update connection:", error);
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
        onClose={handleDialogClose}
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
          <TagInput value={editedPerson.tags} onChange={handleTagInput} />

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
