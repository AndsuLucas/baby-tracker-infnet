import React from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../data/AuthProvider";
import { AppBar, Toolbar, IconButton, Typography, Container, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DiaperIcon from "@mui/icons-material/BabyChangingStation";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useBabyContext } from "../data/BabyProvider";
import { BabyRegister } from "../interfaces/BabyRegister";
import Card from "./../components/Card";
import BabyTable from "../components/BabyTable";

const Home: React.FC = () => {
    const { t } = useTranslation();
    const userContext = React.useContext(UserContext);
    const { user } = userContext;
    const navigate = useNavigate();
    const babyContext = useBabyContext();

    const { babyDto } = babyContext;

    const mapTasks = () => {
        if (!babyDto) {
            return [];
        }

        return babyDto.getRegisters().map((register: BabyRegister) => {
            if (register.type === "eat") {
                const taskName = `${t("task.eat")}: ${
                    register.food.type === "feedingBottle" ? t("feedingBottle") : t("breastfeeding")
                }`;
                const icon = <RestaurantIcon />;
                return { taskName, icon, type: register.type, id: register.id };
            }

            if (register.type === "sleep") {
                const taskName = `${t("task.sleep")} ${register.startDate} ${t("to")} ${register.endDate}`;
                const icon = <BedtimeIcon />;
                return { taskName, icon, type: register.type, id: register.id };
            }

            if (register.type === "diaper") {
                const taskName = `${t("task.diaper")} (${register.state})`;
                const icon = <DiaperIcon />;
                return { taskName, icon, type: register.type, id: register.id };
            }

            return {};
        });
    };

    const handleCardAction = (registerId: number, taskType: string) => {
        const editPageByTaskType: { [key: string]: string } = {
            eat: "/eat",
            sleep: "/sleep",
            diaper: "/diaper",
        };

        if (editPageByTaskType[taskType]) {
            navigate(`${editPageByTaskType[taskType]}/${registerId}`);
        }
    };

    const getCardActionButton = (registerId: number, taskType: string) => {
        return [
            <Button color="primary" onClick={() => handleCardAction(registerId, taskType)}>
                {t("edit")}
            </Button>,
        ];
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                        {t("appName")}
                    </Typography>
                    <Box>
                        <Button color="inherit" startIcon={<DashboardIcon />} component={Link} to="/dashboard">
                            {t("dashboard")}
                        </Button>
                        <Button color="inherit" startIcon={<SettingsIcon />} component={Link} to="/settings">
                            {t("settings")}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                {babyDto && <BabyTable baby={babyDto} />}
                <br />
                <Typography variant="h6" gutterBottom>
                    {t("chooseAction")}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<RestaurantIcon />}
                        onClick={() => navigate("/eat")}
                    >
                        {t("actions.eat")}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<BedtimeIcon />}
                        onClick={() => navigate("/sleep")}
                    >
                        {t("actions.sleep")}
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        startIcon={<DiaperIcon />}
                        onClick={() => navigate("/diaper")}
                    >
                        {t("actions.diaper")}
                    </Button>
                </Box>
            </Container>

            <Container>
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    {t("tasks")}
                </Typography>
                <List>
                    {mapTasks().map((task: any, index: number) => (
                        <>
                            <Card
                                children={
                                    <ListItem divider key={index}>
                                        <ListItemIcon>{task.icon}</ListItemIcon>
                                        <ListItemText primary={task.taskName} />
                                    </ListItem>
                                }
                                actions={getCardActionButton(task.id, task.type)}
                            />
                            <br />
                        </>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default Home;
