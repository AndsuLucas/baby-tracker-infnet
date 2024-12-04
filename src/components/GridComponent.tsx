import React from "react";
import { Grid, Paper } from "@mui/material";

interface GridComponentProps {
  items: string[];
}

const GridComponent: React.FC<GridComponentProps> = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              textAlign: "center",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            role="gridcell"
          >
            {item}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridComponent;
