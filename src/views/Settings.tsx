import React from "react";
import { useTranslation } from "react-i18next";
import '../utils/i18n';
import Box from "../components/Box";
import { FormLabel, Stack } from "@mui/joy";
import { UserContext } from "../data/AuthProvider";
import CustomAppBar from "../components/CustomAppBar";
import CustomButton from "../components/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/material/Typography";
import Form from "../components/Form";
import { useBabyContext } from "../data/BabyProvider";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Settings: React.FC = () => {
    const { t, i18n } = useTranslation();
    const userContext = React.useContext(UserContext);
    const { logout } = userContext;

    const babyContext = useBabyContext();
    const { babyDto, updateBabyData } = babyContext;

    const [language, setLanguage] = React.useState(i18n.language);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(false);
    }, []);

    const navigate = useNavigate();
    if (isLoading) {
        return (
            <Box boxProps={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleSubmit = (formData: { [key: string]: any }) => {
        updateBabyData(formData["name"], new Date(formData["birdthday"]), formData["weight"], formData["height"]);
        navigate("/");
    };

    const handleLanguageChange = (event: React.SyntheticEvent | null, newValue: string) => {
        setLanguage(newValue);
        i18n.changeLanguage(newValue);
        localStorage.setItem("lang", newValue);
    };

    const fields = [
        {
            label: t("name"),
            id: "name",
            defaultValue: babyDto?.name,
            props: {
                required: true,
                type: "text"
            }
        },
        {
            label: t("birthday"),
            id: "birdthday",
            defaultValue: babyDto?.birthDay,
            props: {
                required: true,
                type: "date"
            }
        },
        {
            label: t("weight"),
            id: "weight",
            defaultValue: babyDto?.weight,
            props: {
                required: true,
                type: "number"
            }
        },
        {
            defaultValue: babyDto?.height,
            label: t("height"),
            id: "height",
            props: {
                required: true,
                type: "number"
            }
        }
    ];

    return (
        <Stack>
            <CustomAppBar backPath="/" pageTitle={t("language")} />
            <FormLabel sx={{ display: "block", marginBottom: "5px", marginTop: "10px" }}>{t("language")}</FormLabel>
            <Select
                value={language}
                onChange={(e, value) => handleLanguageChange(e, value!)}
                sx={{ marginBottom: "10px", marginTop: "10px" }}
            >
                <Option value="pt">Português</Option>
                <Option value="es">Español</Option>
                <Option value="en">English</Option>
            </Select>
            <br />
            <CustomButton label={t("logout")} onClick={logout} color="error" />
            <br />
            <Typography variant="h5" gutterBottom>
                {t("babyData")}
            </Typography>
            <Form fields={fields} onSubmit={(formData) => handleSubmit(formData)}></Form>
        </Stack>
    );
};

export default Settings;
