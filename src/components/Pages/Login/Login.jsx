import React, { useRef, useState } from "react";
import axios from "axios";

import LinkButton from "../../LinkButton/LinkButton";
import Input from "../../Input/Input";
import { useAuth } from "../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isInvalid, setIsInvalid] = useState([]);
  const [visible, setVisible] = useState(false);
  const email = useRef();
  const password = useRef();  

  const { Login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const fields = [
      { input: email.current.name, value: email.current.value },
      { input: password.current.name, value: password.current.value },
    ];

    const fieldsInvalid = [];

    fields.forEach((field) => {
      if (!field.value) {
        fieldsInvalid.push(field.input);
      }
    });

    setIsInvalid(fieldsInvalid);

    if (fieldsInvalid.length <= 0) {
      axios({
        method: "get",
        url: "http://localhost:5000/users",
        responseType: "json",
      })
        .then((response) => {
          const users = response.data;

          const user = users.find(
            (user) => user.email === email.current.value && user.password === password.current.value
          );

          const timer = setTimeout(() => {
            setVisible(false);
          }, 3000);

          if (user) {
            Login(user);
            navigate("/home");
          }

          setVisible(true);
          return () => clearTimeout(timer);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="form_container">
      {visible && <p className="error">Email or password incorrect</p>}

      <div className="form_group">
        <Input type="text" name="email" text="E-mail: " placeholder="Seu e-mail" refer={email} />
        {isInvalid.includes("email") && <p className="input_error">Email invalid</p>}
      </div>

      <div className="form_group">
        <Input
          type="password"
          name="password"
          text="Senha: "
          placeholder="Senha"
          refer={password}
        />
        {isInvalid.includes("password") && <p className="input_error">Password invalid</p>}
      </div>

      <div className="form_group">
        <LinkButton handleOnClick={handleSubmit} text="Logar" />
        <LinkButton to="/cadastro" text="Cadastre-se" />
      </div>
    </div>
  );
};

export default Login;
