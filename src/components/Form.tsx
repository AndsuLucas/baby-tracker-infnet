import React, {useEffect} from "react";
import MuiTexfield from "@mui/material/TextField";
import CustomButton from "./Button";
import DatePicker from "./DatePicker";
import Alert from '@mui/material/Alert';
import {Stack} from "@mui/joy";
import dayjs from "dayjs";

interface Field {
    id: string;
    label: string;
    props?: object;
    defaultValue?: string;
}

interface FormProps {
    onSubmit: (formData: { [key: string]: any }) => void;
    fields: Field[];
}

const Form: React.FC<FormProps> = ({onSubmit, fields}) => {
    const [formData, setFormData] = React.useState<{ [key: string]: any }>({});

    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        fields.forEach((field) => {
            const value = formData[field.id];
            const isRequired = field.props?.required;

            if (isRequired && (!value || value.toString().trim() === "")) {
                newErrors[field.id] = `${field.label} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };

    const handleChange = (id: string, value: any) => {
        const data = {...formData};
        data[id] = value;
        setFormData(data);
        console.log("change", formData);
    };

    useEffect(() => {
        if (Object.keys(formData).length !== 0) {
            return;
        }

        const data: { [key: string]: any } = {};
        fields.forEach((field: Field) => {
            const key = field.id;
            data[key] = field.defaultValue ? field.defaultValue : "";
        });
        console.log('data', data);
        setFormData(data);
    }, []);

    const renderError = () => {
        if (Object.keys(errors).length === 0) {
            return null;
        }
        const message = Object.values(errors).join(", ");
        return <Alert severity="error">{message}</Alert>
    }
    const renderFields = () => {
        return fields.map((field: Field) => {
            const props = field.props || {};
            const commonStyle = {width: "100%"};
            const hasError = !!errors[field.id];

            if (props?.type === "textarea") {
                return (
                    <div style={{marginBottom: "10px"}} key={field.id}>
                        <MuiTexfield
                            id={field.id}
                            label={field.label}
                            multiline
                            rows={4}
                            {...props}
                            error={hasError}
                            value={formData[field.id]}
                            helperText={hasError ? errors[field.id] : ""}
                            onChange={(v) => handleChange(field.id, v.target.value)}
                            sx={commonStyle}
                        />
                    </div>
                );
            }

            if (props?.type === "date") {
                return (
                    <div style={{marginBottom: "10px"}} key={field.id}>
                        <DatePicker
                            label={field.label}
                            onChange={(v) => handleChange(field.id, v)}
                            sx={commonStyle}
                            value={formData[field.id]}
                        />
                        {hasError && <div style={{color: "red", marginTop: "5px"}}>{errors[field.id]}</div>}
                    </div>
                );
            }

            return (
                <div style={{marginBottom: "10px"}} key={field.id}>
                    <MuiTexfield
                        id={field.id}
                        label={field.label}
                        {...props}
                        error={hasError}
                        helperText={hasError ? errors[field.id] : ""}
                        onChange={(v) => handleChange(field.id, v.target.value)}
                        value={formData[field.id]}
                        sx={commonStyle}
                    />
                </div>
            );
        });
    };


    return (
        <form>
            {renderError()}
            <br/>
            <Stack spacing={5}>
                {renderFields()}
                <CustomButton label="Submit" onClick={() => handleSubmit()}/>
            </Stack>
        </form>
    );
};

export default Form;
