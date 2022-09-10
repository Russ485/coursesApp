import React from "react";
import styles from "./Modal.module.css";
import Button from "../common/Button/Button";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p>{props.text}</p>
      </div>
      <div className={styles.btn}>
        <Button type={"button"} onClick={props.onClick} text={"Confirm"} />
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      <BackDrop onClick={props.onClick} />,
      <ModalOverlay onClick={props.onClick} text={props.text} />,
    </React.Fragment>
  );
};

export default Modal;
