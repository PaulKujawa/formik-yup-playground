import React from "react";
import { useFormikContext, getIn } from "formik";

interface Props {
  name: string;
}

export const ValidationMessage = ({ name }: Props) => {
  const formik = useFormikContext();

  // name will be an attribute path that could look like "pets[0].name"
  const error = getIn(formik.errors, name);

  return formik.submitCount > 0 && error ? (
    <div style={{ color: "red" }}>{error}</div>
  ) : null;
};
