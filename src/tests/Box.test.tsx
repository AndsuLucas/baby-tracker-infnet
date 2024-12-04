import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Box from "../components/Box";

describe("Componente Box", () => {
  it("Deverenderizar o componente box com o estilo desejado", () => {
    render(<Box boxProps={{ border: "1px solid black" }} />);
    const box = screen.getByTestId("custom-box");
    expect(box).toBeInTheDocument();
    expect(box).toHaveStyle("border: 1px solid black");
  });
});
