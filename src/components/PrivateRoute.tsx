import React from "react";
import { Navigate } from "react-router-dom";
import PrivateRouteProps from "../interfaces/PrivateRouteProps";
import {UserContext} from "../data/AuthProvider";
import Box from "./Box";
import CircularProgress from "@mui/material/CircularProgress";
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const userContext = React.useContext(UserContext);
  const { isLogged } = userContext;
  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
        <Box boxProps={{display: 'flex'}}>
          <CircularProgress />
        </Box>
    );
  }

  if (!isLogged()) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
