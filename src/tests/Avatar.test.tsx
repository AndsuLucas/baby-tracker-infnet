import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from "../components/Avatar";

describe("Componente avatar", () => {
  it("Deve renderizar o avatar com a imagem fornecida, alt e dimensões", () => {
    render(
      <Avatar
        src="./image/test"
        alt="img-test"
        size={{ height: 50, width: 50 }}
      />
    );

    const avatar = screen.getByTestId("avatar-img-test");
    expect(avatar).toBeInTheDocument();

    expect(avatar.getElementsByTagName("img")[0]).toHaveAttribute(
      "alt",
      "img-test"
    );

    expect(avatar.getElementsByTagName("img")[0]).toHaveAttribute(
      "src",
      "./image/test"
    );

    expect(avatar).toHaveStyle("width: 50px");
    expect(avatar).toHaveStyle("height: 50px");
  });
});
