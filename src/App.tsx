import React from "react";
import "./app.css";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { deepConversionOfEmptyStringToNull, useMockServerResponse } from "./utils";
import { CustomerYupSchema, getCustomerFormikInitialValue } from "./entities/customer";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Debug } from "./components/Debug";

const initialValues = {
  person: {
      name: ""
  }
};

const Schema = Yup.object({
  person: Yup.object({
       name: Yup.string().required()
  })
});


export const App = () => {
  const serverResponse = useMockServerResponse();

  if (serverResponse === null) {
    return <div className="loader" />;
  }
  
  return (
    <Formik
      initialValues={getCustomerFormikInitialValue(serverResponse)}
      validationSchema={CustomerYupSchema}
      // validate={(values: any) =>
      //   CustomerYupSchema.validate(prepareDataForValidation(values), {
      //     abortEarly: false,
      //     context: {
      //       contextAge: values.age
      //     }
      //   })
      //     .then(validValues => ({}))
      //     .catch(error => yupToFormErrors(error))
      // }
      onSubmit={(values: any) => {
        console.log("submitted", values);
        console.log("converted", deepConversionOfEmptyStringToNull(values));
      }}
    >
      {() => (
        <div style={{display: 'flex'}}>
          <div>
            <Body />
            <br />
            <Footer />
          </div>
          <Debug hidden={false} />
        </div>
      )}
    </Formik>
  );
};
