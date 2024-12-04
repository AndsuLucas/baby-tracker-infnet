import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "../components/Alert";

describe("Componente de alerta", () => {
  it("Deve renderizar o alerta de sucesso", () => {
    render(<Alert text="Success message" type="success" />);
    const alert = screen.getByTestId("alert-success");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Success message");
  });

  it("Deve renderizar o alerta de erro", () => {
    render(<Alert text="Error message" type="error" />);
    const alert = screen.getByTestId("alert-error");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Error message");
  });

  it("Deve renderizar o alerta de info", () => {
    render(<Alert text="Info message" type="info" />);
    const alert = screen.getByTestId("alert-info");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Info message");
  });

  it("Deve renderizar o alerta de warning", () => {
    render(<Alert text="Warning message" type="warning" />);
    const alert = screen.getByTestId("alert-warning");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Warning message");
  });
});
