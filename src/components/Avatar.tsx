import { Avatar as MuiAvatar } from "@mui/material";
import AvatarProps from "../interfaces/AvatarProps";
import React from "react";

const Avatar: React.FC<AvatarProps> = ({ alt, src, size }) => {
  return (
    <MuiAvatar src={src} alt={alt} sx={size} data-testid={`avatar-${alt}`} />
  );
};

export default Avatar;
