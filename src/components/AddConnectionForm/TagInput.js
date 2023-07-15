import React from "react";
import { styled } from "@mui/system";
import { Chip, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const tagSuggestions = [
  "Networking",
  "Mentor",
  "Industry Expert",
  "Investor",
  "Internship",
];

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
});

const TagInput = ({ value, onChange }) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tagSuggestions}
      freeSolo
      value={value}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <StyledTextField {...params} variant="outlined" label="Tags" />
      )}
      onChange={(event, value) => onChange(value)}
    />
  );
};

export default TagInput;
