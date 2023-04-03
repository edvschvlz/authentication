import React from "react";

import styles from "./Home.module.css";

import { useAuth } from "../../../contexts/AuthProvider";
import LinkButton from "../../LinkButton/LinkButton";

const Home = () => {
  const { Logout } = useAuth();

  return (
    <div className={styles.container}>  
      <h1>Você está logado !</h1>
      <LinkButton handleOnClick={() => Logout()} to="/login" text="Deslogar" />
    </div>
  );
};

export default Home;
