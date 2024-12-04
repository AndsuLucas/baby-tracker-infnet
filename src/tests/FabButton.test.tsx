import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FabButton from "../components/FabButton";

describe("Componente FabButton", () => {
  it("Deve renderizar o Fab com o ícone e o label correto", () => {
    const mockOnClick = jest.fn();

    render(<FabButton label="Adicionar" onClick={mockOnClick} />);

    const fabButton = screen.getByTestId("fab-button");
    expect(fabButton).toBeInTheDocument();
    expect(fabButton).toHaveAttribute("aria-label", "Adicionar");

    // Simula o clique no botão
    fireEvent.click(fabButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
