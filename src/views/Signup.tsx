import React, { useEffect } from "react";
import Box from "../components/Box";
import Form from "../components/Form";

interface User {
  login: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

const Signup: React.FC = () => {
  const [user, setUser] = React.useState<User>({
    login: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
  });

  const fields = [
    {
      label: "Username",
      id: "login",
      props: {
        required: true,
      },
    },
    {
      label: "Password",
      id: "password",
      props: {
        required: true,
        type: "password",
      },
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      props: {
        required: true,
        type: "password",
      },
    },
    {
      label: "Name",
      id: "name",
      props: {
        required: true,
      },
    },
    {
      label: "Email",
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
      <h1>Signup</h1>
      <Form onSubmit={handleSubmit} fields={fields} />
    </Box>
  );
};

export default Signup;
