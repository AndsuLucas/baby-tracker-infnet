import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Container from "../components/Container";

describe("Componente Container", () => {
  it("Deve renderizar o Container com os filhos fornecidos e aplicar as props corretamente", () => {
    render(
      <Container
        data-testid="container-test"
        maxWidth="sm"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <p>Texto de teste</p>
      </Container>
    );

    const container = screen.getByTestId("container-test");
    expect(container).toBeInTheDocument();

    expect(container).toHaveTextContent("Texto de teste");

    expect(container).toHaveClass("MuiContainer-maxWidthSm");

    expect(container).toHaveStyle("background-color: #f0f0f0");
  });
});
