import React from "react";

import { Link } from "react-router-dom";

import styles from "./LinkButton.module.css";

const LinkButton = ({ handleOnClick, to, text }) => {
  return (
    <Link to={to} onClick={handleOnClick} className={styles.button}>
      {text}
    </Link>
  );
};

export default LinkButton;
