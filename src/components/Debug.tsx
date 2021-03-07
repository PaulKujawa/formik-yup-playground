import React from "react";
import { useFormikContext } from "formik";

interface Props {
  hidden: boolean;
}

export const Debug = ({ hidden }: Props) => {
  const formik = useFormikContext();

  return (
    <pre
      style={{
        marginLeft: "3rem",
        background: "#f6f8fa",
        display: hidden ? "none" : "block"
      }}
    >
      <div>
        <i>INTERNAL STATE FOR DEBUGGING:</i>
      </div>
      {JSON.stringify(formik, null, 2)}
    </pre>
  );
};
