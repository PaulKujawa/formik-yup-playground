import React from "react";
import { useFormikContext, FieldArray, Field } from "formik";
import { ValidationMessage } from "./ValidationMessage";
import { CustomerResponse } from "../entities/customer";

// while an event's value is always of type string
// the input value can be string, string[], number, or undefined.
// with undefined making the form control uncontrolled.
// uncontrolled means value are only dispatched, not received

export const Body = () => {
  const formik = useFormikContext<CustomerResponse>();

  return (
    <React.Fragment>
      <div>
        age: <Field name="age" type="number" />
        <ValidationMessage name="age" />
      </div>

      <div>
        email: <Field name="email" type="email" />
        <ValidationMessage name="email" />
      </div>

      <div>
        birthday: <Field name="dayOfBirth" />
        <ValidationMessage name="dayOfBirth" />
      </div>

      <div>
        day of death: <Field name="dayOfDeath" />
        <ValidationMessage name="dayOfDeath" />
      </div>

      <div>
        <ValidationMessage name="datesCompared" />
      </div>

      <div>
        with pets: <Field name="withPets" type="checkbox" />
        <ValidationMessage name="withPets" />
      </div>

      {formik.values.withPets && (
        <div>
          pets:
          <div style={{ marginLeft: "1rem" }}>
            <FieldArray name="pets">
              {(formikArrayHelpers: any) => (
                <React.Fragment>
                  {formik.values.pets.map((pet: any, idx: number) => (
                    <div key={idx}>
                      <Field name={`pets[${idx}].name`} />
                      <button
                        type="button"
                        onClick={() => formikArrayHelpers.remove(idx)}
                      >
                        -
                      </button>
                      <ValidationMessage name={`pets[${idx}].name`} />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => formikArrayHelpers.push({ name: "" })}
                  >
                    Add pet
                  </button>
                </React.Fragment>
              )}
            </FieldArray>
            <ValidationMessage name="pets" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
