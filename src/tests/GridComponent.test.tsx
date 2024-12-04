import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GridComponent from "../components/GridComponent";

describe("Componente GridComponent", () => {
  it("Deve renderizar o Grid com os itens fornecidos", () => {
    const items = ["Item 1", "Item 2", "Item 3"];

    render(<GridComponent items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    const gridItems = screen.getAllByRole("gridcell");
    expect(gridItems.length).toBe(items.length);
  });
});
