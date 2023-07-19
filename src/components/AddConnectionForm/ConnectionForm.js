import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import TagInput from "./TagInput";
import UserContext from "../../UserContext";

const ConnectionForm = ({ onClose }) => {
  const [connection, setConnection] = useState({
    name: "",
    industry: "",
    contact: "",
    value: "",
    linkedin: "",
    metAt: "",
    notes: "",
    tags: [],
    userId: null,
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleChange = (e) => {
    setConnection({ ...connection, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (tags) => {
    setConnection({ ...connection, tags: tags });
  };

  const { loading, user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();

      const connectionWithUserId = { ...connection, userId: user.uid };

      const response = await axios.post(
        "/api/getConnections",
        connectionWithUserId
      );
      console.log("done");

      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

    onClose();
  };

  return (
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
      <TagInput value={connection.tags} onChange={handleTagsChange} />

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
  );
};

export default ConnectionForm;
