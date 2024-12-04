import * as React from "react";
import MuiBox from "@mui/material/Box";

const Box: React.FC<{ boxProps?: object; children: React.ReactNode }> = ({
  boxProps,
  children,
}) => {
  return (
    <MuiBox component="section" sx={boxProps} data-testid="custom-box">
      {children}
    </MuiBox>
  );
};

export default Box;
