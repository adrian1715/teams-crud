import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

function Backdrop(props) {
  const navigate = useNavigate();
  function closeHandler() {
    if (!props.onClose) {
      return navigate("..");
    }
    return props.onClose();
  }
  return <div className={styles.backdrop} onClick={closeHandler}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById("modal");

export default function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
