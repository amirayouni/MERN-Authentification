import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ onClick, label, type, style }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Button
        onClick={onClick}
        type={type}
        style={{
          width: "20%",
          marginTop: "20px",
          padding: "0.75rem",
          fontSize: "1rem",
          backgroundColor: "#0b2f9f",
          borderRadius: "25px",
          cursor: "pointer",
        }}
        variant="contained"
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;
