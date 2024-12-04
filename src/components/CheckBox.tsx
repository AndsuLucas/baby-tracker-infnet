import React from "react";
import MuiCheckbox from "@mui/material/Checkbox";

const CheckBox: React.FC<{
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ checked, handleChange, ...props }) => {
  return <MuiCheckbox checked={checked} onChange={handleChange} {...props} />;
};

export default CheckBox;
