import React from "react";
import Button from "@mui/material/Button";
import CustomButtonProps from "../interfaces/CustomButtonProps";

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, color, props }) => {
  const getColor = () => color ? color : 'primary';
  const getProps = () => props ? props : {};
  return (
    <Button variant="contained" color={getColor()} onClick={onClick} {...getProps()}>
      {label}
    </Button>
  );
};

export default CustomButton;
