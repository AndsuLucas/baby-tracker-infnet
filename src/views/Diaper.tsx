import React from 'react';
import { useTranslation } from 'react-i18next'; // Importa o hook de tradução
import Box from "../components/Box";
import Form from "../components/Form";
import CustomAppBar from "../components/CustomAppBar";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { FormLabel } from "@mui/joy";
import { useBabyContext } from "../data/BabyProvider";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Diaper: React.FC = () => {
    const { t } = useTranslation();
    const [diaperState, setDiaperState] = React.useState<string>('poop');
    const babyContext = useBabyContext();
    const { babyDto, addRegister, getCurrentId, getRegisterById, updateRegister, removeRegisterById } = babyContext;
    const navigate = useNavigate();
    const { registerId } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (registerId) {
            const register = getRegisterById(parseInt(registerId)) as { [key: string]: any };
            if (register) {
                setDiaperState(register['state']);
            }
        }
        setIsLoading(false);
    }, [registerId]);

    if (isLoading) {
        return (
            <Box boxProps={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    const getDeleteActionIfneeds = () => {
        if (!registerId) return null;
        return () => {
            const response = window.confirm(t('deleteConfirmation')); // Usando a tradução
            if (response) {
                removeRegisterById(parseInt(registerId));
                navigate('/');
            }
        };
    };

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
            return { defaultValue: register[prop] };
        }

        return {};
    };

    const fields = [
        {
            label: t('dateAndTime'),
            id: 'date',
            props: {
                type: 'date',
                required: true,
            },
            ...getDefaultValueIfHave('date'),
        },
        {
            label: t('obs'),
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
            <CustomAppBar backPath="/" pageTitle={t('diaperRegister')} deleteAction={getDeleteActionIfneeds()} />
            <Box boxProps={{ marginTop: '20px' }}>
                <FormLabel sx={{ display: 'block', marginBottom: '5px' }}>{t('diaperState')}</FormLabel> {/* Usando a tradução */}
                <Select value={diaperState} sx={{ marginBottom: '10px' }} onChange={handleDiaperState}>
                    <Option value="pee">{t('pee')}</Option> {/* Usando a tradução */}
                    <Option value="poop">{t('poop')}</Option> {/* Usando a tradução */}
                    <Option value="both">{t('both')}</Option> {/* Usando a tradução */}
                    <Option value="neither">{t('neither')}</Option> {/* Usando a tradução */}
                </Select>
                <Form onSubmit={(formData) => handleSubmit(formData)} fields={fields} />
            </Box>
        </section>
    );
};

export default Diaper;
