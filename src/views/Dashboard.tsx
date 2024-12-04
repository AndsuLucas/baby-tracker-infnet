import React from "react";
import CustomAppBar from "../components/CustomAppBar";

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = React.useState<{}>({});
  return (
    <section>
      <CustomAppBar backPath='/' pageTitle='Dashboard' />
      <p>Dashboard</p>
    </section>
  );
};

export default Dashboard;
