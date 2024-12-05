import React, { useEffect } from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import { useTranslation } from "react-i18next";

interface User {
  login: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

const Signup: React.FC = () => {
  const { t } = useTranslation();

  const [user, setUser] = React.useState<User>({
    login: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const fields = [
    {
      label: t("username"),
      id: "login",
      props: {
        required: true,
      },
    },
    {
      label: t("password"),
      id: "password",
      props: {
        required: true,
        type: "password",
      },
    },
    {
      label: t("confirmPassword"),
      id: "confirmPassword",
      props: {
        required: true,
        type: "password",
      },
    },
    {
      label: t("name"),
      id: "name",
      props: {
        required: true,
      },
    },
    {
      label: t("email"),
      id: "email",
      props: {
        required: true,
        type: "email",
      },
    },
  ];

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
    setUser({
      login: formData.login || "",
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
      name: formData.name || "",
      email: formData.email || "",
    });
  };

  return (
      <Box boxProps={{ flexDirection: "column" }}>
        <h1>{t("signup")}</h1>
        <Form onSubmit={handleSubmit} fields={fields} />
      </Box>
  );
};

export default Signup;
