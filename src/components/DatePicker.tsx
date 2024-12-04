import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Props {
    label: string;
    onChange: (date: Dayjs | null) => void;
    sx?: object;
    value?: string | null;
}

const DatePicker: React.FC<Props> = ({ label, onChange, sx, value }) => {
    const parsedValue = value ? dayjs(value) : null;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDateTimePicker
                label={label}
                onChange={onChange}
                sx={sx || {}}
                value={parsedValue}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
