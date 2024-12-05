import React from "react";
import Box from "../components/Box";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../data/AuthProvider";
import { useTranslation } from "react-i18next";

const Signin: React.FC = () => {
  const { t } = useTranslation();
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
      alert(t("alertLoginMessage"));
    }
  };

  const fields = [
    {
      label: t("username"),
      id: "user",
      props: {
        required: true,
      },
    },
    {
      label: t("password"),
      id: "pass",
      props: {
        required: true,
        type: "password",
      },
    },
  ];
  return (
      <Box boxProps={{ textAlign: "center" }}>
        <h1>{t("signin")}</h1>
        <Form onSubmit={(formData) => login(formData)} fields={fields} />
      </Box>
  );
};

export default Signin;
