import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import styles from "./Register.module.css";

import LinkButton from "../../LinkButton/LinkButton";
import Input from "../../Input/Input";

const Register = () => {
  const [isInvalid, setIsInvalid] = useState([]);
  const [visible, setVisible] = useState(false);
  const name = useRef();
  const email = useRef(); 
  const password = useRef();
  const privacyTerms = useRef(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const fields = [
      { input: name.current.name, value: name.current.value },
      { input: email.current.name, value: email.current.value },
      { input: password.current.name, value: password.current.value },
      { input: privacyTerms.current.name, value: privacyTerms.current.checked },
    ];

    const fieldsInvalid = [];

    fields.forEach((field) => {
      if (!field.value) {
        fieldsInvalid.push(field.input);
      }

      if (field.input === "email" && !validateEmail(field.value)) {
        fieldsInvalid.push(field.input);
      }
    });

    setIsInvalid(fieldsInvalid);

    if (fieldsInvalid.length <= 0) {
      registerUser();
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const registerUser = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/users",
      data: {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      },
    }).then(() => {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    });
  };

  return (
    <div className="form_container">
      {visible && <p className="success">Registered successfully</p>}
      <div className="form_group">
        <Input type="text" name="name" text="Nome: " placeholder="Seu nome" refer={name} />
        {isInvalid.includes("name") && <p className="input_error">Name invalid</p>}
      </div>

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
        <div className={styles.checkbox_group}>
          <input type="checkbox" name="privacyTerms" defaultChecked={false} ref={privacyTerms} />
          <label>I agree with the privacy terms.</label>
        </div>
        {isInvalid.includes("privacyTerms") && (
          <p className="input_error">You must agree with the privacy terms</p>
        )}
      </div>

      <div className="form_group">
        <LinkButton handleOnClick={handleSubmit} text="Cadastrar" />
        <LinkButton to="/login" text="Login" />
      </div>
    </div>
  );
};

export default Register;
