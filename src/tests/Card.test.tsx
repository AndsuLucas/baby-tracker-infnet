import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../components/Card";

describe("Componente Card", () => {
  it("Deve deve renderizar o Card com o conteudo escolhido e seus botões", () => {
    const customContent = (
      <div data-testid="container">
        <p>Teste 123</p>
      </div>
    );
    const buttons = <button data-testid="button">Click!</button>;
    render(
      <Card
        children={customContent}
        actions={[buttons]}
        cardStyle={{ minWidth: 275 }}
      />
    );

    const card = screen.getByTestId("custom-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle("minWidth: 275px");

    const content = screen.getByTestId("container");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Teste 123");

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });
});
