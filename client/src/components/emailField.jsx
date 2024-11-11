import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export default function EmailField({ label = "Email", onEmailChange }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (onEmailChange) {
      onEmailChange(value);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-email">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        label={label}
      />
    </FormControl>
  );
}
