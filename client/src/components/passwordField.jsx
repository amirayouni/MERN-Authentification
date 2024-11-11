import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Typography,
} from "@mui/material";

export default function PasswordField({
  label = "Password",
  onPasswordChange,
  showHelperText = true,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);

    if (onPasswordChange) {
      onPasswordChange(newValue);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide password" : "show password"}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {showHelperText && (
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginTop: "8px", fontSize: "0.8em" }}
        >
          Use at least 8 characters, one uppercase, one lowercase, and one
          number.
        </Typography>
      )}
    </FormControl>
  );
}
