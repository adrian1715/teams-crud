import React from "react";

export default function Error(props) {
  const { error } = props;
  return (
    <>
      <h1>{`${error.code} ${error.info}`}</h1>
      <p>{error.message}</p>
    </>
  );
}
