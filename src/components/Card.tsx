import React, { ReactNode } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MuiCard from "@mui/material/Card";

const Card: React.FC<{
  children: ReactNode;
  actions?: Array<ReactNode> | null;
  cardStyle?: object;
}> = ({ children, actions, cardStyle }) => {
  const renderActions = () => {
    if (actions) {
      return actions.map((a) => a);
    }
  };
  return (
    <MuiCard sx={cardStyle} data-testid="custom-card">
      <CardContent>{children}</CardContent>
      <CardActions>{renderActions()}</CardActions>
    </MuiCard>
  );
};

export default Card;
