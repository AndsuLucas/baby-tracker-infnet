import React from "react";
import Container from "../components/Container";
import Box from "../components/Box";
import {FormLabel, Stack} from "@mui/joy";
import {UserContext} from "../data/AuthProvider";
import CustomAppBar from "../components/CustomAppBar";
import CustomButton from "../components/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/material/Typography";
import Form from "../components/Form";
import {useBabyContext} from "../data/BabyProvider";
import {useNavigate} from "react-router-dom";
const Settings: React.FC = () => {
    const userContext = React.useContext(UserContext);
    const {logout} = userContext;
    const babyContext = useBabyContext();
    const {babyDto, updateBabyData} = babyContext;

  const defaultLanguage = navigator.language.split('-')[0];
  const [language, setLanguage] = React.useState(defaultLanguage);

  const navigate = useNavigate();

  const handleSubmit = (formData: { [key: string]: any }) => {
    updateBabyData(formData['name'], new Date(formData['birdthday']), formData['weight'], formData['height']);
    navigate('/');
  };

    const handleLanguageChange = (event: React.SyntheticEvent | null, newValue: string) => {

    }

    const fields = [
        {
            label: 'name',
            id: 'name',
            defaultValue: babyDto?.name,
            props: {
                required: true,
                type: 'text'
            },
        },
        {
            label: 'birdthday',
            id: 'birdthday',
            defaultValue: babyDto?.birthDay,
            props: {
                required: true,
                type: 'date'
            },
        },
        {
            label: 'weight',
            id: 'weight',
          defaultValue: babyDto?.weight,
            props: {
                required: true,
                type: 'number'
            },
        },
        {
          defaultValue: babyDto?.height,
            label: 'height',
            id: 'height',
            props: {
                required: true,
                type: 'number'
            },
        },
    ]

    return (
        <Stack>
            <CustomAppBar backPath='/' pageTitle='Settings'/>
            <FormLabel sx={{display: 'block', marginBottom: '5px', marginTop: '10px'}}>Idioma</FormLabel>
            <Select
                value={language}
                onChange={() => handleLanguageChange }
                sx={{marginBottom: "10px", marginTop: "10px"}}
            >
                <Option value="pt">Português</Option>
                <Option value="es">Español</Option>
                <Option value="en">English</Option>
            </Select>
            <br/>
            <CustomButton label='Logout' onClick={logout} color='error'/>
            <br/>
            <Typography variant="h5" gutterBottom>
                Dados do bebe.
            </Typography>
            <Form fields={fields} onSubmit={(formData)=> handleSubmit(formData)}></Form>
        </Stack>
    )
};

export default Settings;
