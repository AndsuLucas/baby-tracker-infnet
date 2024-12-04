import React from 'react';
import Box from "../components/Box";
import Form from "../components/Form";
import CustomAppBar from "../components/CustomAppBar";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {FormLabel} from "@mui/joy";
import {useBabyContext} from "../data/BabyProvider";
import {useNavigate, useParams} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
const Diaper: React.FC = () => {
    const [diaperState, setDiaperState] = React.useState<string>('poop');

    const babyContext = useBabyContext();

    const {babyDto, addRegister, getCurrentId, getRegisterById, updateRegister, removeRegisterById} = babyContext;

    const navigate = useNavigate()

    const {registerId} = useParams();

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (registerId) {
            const register = getRegisterById(parseInt(registerId)) as { [key: string]: any };
            if (register) {
                console.log(register);
                setDiaperState(register['state']);
                console.log(diaperState);
            }
        }
        setIsLoading(false);
    }, [registerId, setDiaperState]);

    if (isLoading) {
        return (
            <Box boxProps={{display: 'flex'}}>
                <CircularProgress />
            </Box>
        );
    }

    const getDeleteActionIfneeds = () => {
        if (!registerId) {
            return null;
        }

        return () => {
            const response = window.confirm('Deseja deletar?')
            if (response) {
                removeRegisterById(parseInt(registerId));
                navigate('/');
            }
        }
    }

    const handleDiaperState = (event: React.SyntheticEvent | null, newValue: string) => {
        setDiaperState(newValue as string);
    };

    const handleSubmit = (formData: { [key: string]: any }) => {
        const sleepRegister = {
            id: registerId ? registerId : getCurrentId(),
            state: diaperState,
            type: 'diaper',
            ...formData,
        };

        if (registerId) {
            updateRegister(sleepRegister);
        } else {
            addRegister(sleepRegister);
        }

        console.log(babyDto);
        navigate('/');
    };

    const getDefaultValueIfHave = (prop: string) => {
        if (!registerId) {
            return {};
        }

        const register = getRegisterById(parseInt(registerId)) as { [key: string]: any };
        if (!register) {
            return {};
        }

        if (register[prop]) {
            console.log(register[prop]);
            return {defaultValue: register[prop]};
        }

        return {};
    }

    const fields = [
        {
            label: 'Date and time',
            id: 'date',
            props: {
                type: 'date',
                required: true,
            },
            ...getDefaultValueIfHave('date'),
        },
        {
            label: 'Obs',
            id: 'obs',
            props: {
                type: 'textarea',
                required: false,
            },
            ...getDefaultValueIfHave('obs'),
        },
    ];

    return (
        <section>
            <CustomAppBar backPath="/" pageTitle="Diaper register" deleteAction={getDeleteActionIfneeds()}/>
            <Box boxProps={{marginTop: '20px'}}>
                <FormLabel sx={{display: 'block', marginBottom: '5px'}}>Diaper state</FormLabel>
                <Select value={diaperState} sx={{marginBottom: '10px'}} onChange={handleDiaperState}>
                    <Option value="pee">Pee</Option>
                    <Option value="poop">Poop</Option>
                    <Option value="both">Both</Option>
                    <Option value="neither">Neither</Option>
                </Select>
                <Form onSubmit={(formData) => handleSubmit(formData)} fields={fields}/>
            </Box>
        </section>
    )
};

export default Diaper;