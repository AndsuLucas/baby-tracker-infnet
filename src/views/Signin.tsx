import React from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../data/AuthProvider";

const Signin: React.FC = () => {
  const [user, setUser] = React.useState<{}>({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  const userContext = React.useContext(UserContext);
  const { doLogin } = userContext;

  const login = (formData: { [key: string]: any }) => {
    if (formData.pass && formData.user) {
      doLogin({ name: "Professor" });
      navigate("/");
    } else {
      alert("Digite algo no login professor (usuario e senha).");
    }
  };

  const fields = [
    {
      label: "Username",
      id: "user",
      props: {
        required: true,
      },
    },
    {
      label: "Password",
      id: "pass",
      props: {
        required: true,
        type: "password",
      },
    },
  ];
  return (
    <Box boxProps={{ textAlign: "center" }}>
      <h1>Signin</h1>
      <Form onSubmit={(formData) => login(formData)} fields={fields} />
    </Box>
  );
};

export default Signin;
