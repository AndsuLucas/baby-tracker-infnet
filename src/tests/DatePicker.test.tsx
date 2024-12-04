import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DatePicker from "../components/DatePicker";
import dayjs from "dayjs";

describe("Componente DateTimePicker", () => {
  it("Deve renderizar o DateTimePicker com o label fornecido", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Selecionar Data e Hora"
          value={dayjs()}
          onChange={() => {}}
        />
      </LocalizationProvider>
    );

    const label = screen.getByLabelText("Selecionar Data e Hora");
    expect(label).toBeInTheDocument();
  });
});
