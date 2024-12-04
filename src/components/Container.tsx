import React from "react";
import { Container as MuiContainer, ContainerProps } from "@mui/material";

interface Props extends ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children, ...rest }) => {
  return <MuiContainer {...rest}>{children}</MuiContainer>;
};

export default Container;
