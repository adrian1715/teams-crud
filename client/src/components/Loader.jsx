import React from "react";
import Spinner from "./Spinner";
import styles from "./Loader.module.css";

export default function Loader(props) {
  return (
    <div className={styles.container}>
      <span>{props.message}</span>
      <Spinner />
    </div>
  );
}
