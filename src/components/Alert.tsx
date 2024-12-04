import MuiAlert from "@mui/material/Alert";
import React from "react";
import AlertProps from "../interfaces/AlertProps";

const Alert: React.FC<AlertProps> = ({ text, type }) => {
  return (
    <MuiAlert severity={type} data-testid={`alert-${type}`}>
      {text}
    </MuiAlert>
  );
};

export default Alert;
