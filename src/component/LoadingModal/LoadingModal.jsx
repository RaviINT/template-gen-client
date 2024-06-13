import React from "react";
import Modal from "react-modal";
import Loader from "../Loader/Loader";
import styles from "./style.module.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function LoadingModal({ modalIsOpen }) {
  return (
    <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Example Modal">
      <div className={styles.modal}>
        <div className={styles.heading}>Your Template is preparing...</div>
        <Loader />
      </div>
    </Modal>
  );
}
export default LoadingModal;
