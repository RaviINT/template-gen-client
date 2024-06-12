import React from "react";
import styles from "./style.module.css";
function DwnButton({ text,onClick }) {
  return <button className={styles.button} onClick={onClick}>{text}</button>;
}

export default DwnButton;
