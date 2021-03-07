import React from "react";
import { useFormikContext } from "formik";

export const Footer = () => {
  const formik = useFormikContext();

  return (
    <button type="button" onClick={() => formik.handleSubmit()}>
      Submit
    </button>
  );
};
