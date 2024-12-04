import React from "react";
import { Fab } from "@mui/material";

interface FabButtonProps {
  label: string;
  onClick: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({ label, onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label={label}
      onClick={onClick}
      data-testid="fab-button"
    ></Fab>
  );
};

export default FabButton;
