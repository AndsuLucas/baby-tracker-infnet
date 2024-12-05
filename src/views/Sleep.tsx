import React from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import CustomAppBar from "../components/CustomAppBar";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { FormLabel } from "@mui/joy";
import { useBabyContext } from "../data/BabyProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sleep: React.FC = () => {
    const { t } = useTranslation();
    const babyContext = useBabyContext();

    const {
        babyDto,
        addRegister,
        getCurrentId,
        getRegisterById,
        updateRegister,
        removeRegisterById,
    } = babyContext;

    const navigate = useNavigate();
    const { registerId } = useParams();

    const handleSubmit = (formData: { [key: string]: any }) => {
        const sleepRegister = {
            id: registerId ? registerId : getCurrentId(),
            type: "sleep",
            ...formData,
        };

        if (registerId) {
            updateRegister(sleepRegister);
        } else {
            addRegister(sleepRegister);
        }

        console.log(babyDto);
        navigate("/");
    };

    const getDefaultValueIfHave = (prop: string) => {
        if (!registerId) {
            return {};
        }

        const register = getRegisterById(parseInt(registerId)) as {
            [key: string]: any;
        };
        if (!register) {
            return {};
        }

        if (register[prop]) {
            console.log(register[prop]);
            return { defaultValue: register[prop] };
        }

        return {};
    };

    const getDeleteActionIfneeds = () => {
        if (!registerId) {
            return null;
        }

        return () => {
            const response = window.confirm(t("deleteConfirm"));
            if (response) {
                removeRegisterById(parseInt(registerId));
                navigate("/");
            }
        };
    };

    const fields = [
        {
            label: t("startDateTime"),
            id: "startDate",
            props: {
                type: "date",
                required: true,
            },
            ...getDefaultValueIfHave("startDate"),
        },
        {
            label: t("endDateTime"),
            id: "endDate",
            props: {
                type: "date",
                required: true,
            },
            ...getDefaultValueIfHave("endDate"),
        },
        {
            label: t("obs"),
            id: "obs",
            props: {
                type: "textarea",
                required: false,
            },
            ...getDefaultValueIfHave("obs"),
        },
    ];

    return (
        <section>
            <CustomAppBar
                backPath="/"
                pageTitle={t("sleepRegister")}
                deleteAction={getDeleteActionIfneeds()}
            />
            <Box boxProps={{ marginTop: "20px" }}>
                <Form onSubmit={(formData) => handleSubmit(formData)} fields={fields} />
            </Box>
        </section>
    );
};

export default Sleep;
