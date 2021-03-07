import React from "react";
import "./app.css";
import { Formik } from "formik";
import { deepConversionOfEmptyStringToNull } from "./utils";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Debug } from "./components/Debug";
import { useGetCustomer } from "./repositories";
import { CustomerYupSchema, hydrateCustomer } from "./formik";

export const App = () => {
  const serverResponse = useGetCustomer();

  if (serverResponse === null) {
    return <div className="loader" />;
  }
  
  return (
    <Formik
      initialValues={hydrateCustomer(serverResponse)}
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
        console.log("submitted", values, "converted", deepConversionOfEmptyStringToNull(values));
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
