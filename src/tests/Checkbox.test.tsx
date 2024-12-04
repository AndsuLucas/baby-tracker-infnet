import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CheckBox from "../components/CheckBox";

describe("Componente CheckBox", () => {
  it("Deve renderizar com o estado inicial de 'checked'", () => {
    render(<CheckBox checked={true} handleChange={() => {}} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(true);
  });

  it("Deve chamar a função 'event' ao ser clicado", () => {
    const handleChange = jest.fn();
    render(<CheckBox checked={false} handleChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });
});
