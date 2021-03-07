import React from "react";
import { useFormikContext, FieldArray, Field } from "formik";
import { ValidationMessage } from "./ValidationMessage";
import { CustomerResponse } from "../entities/customer";
import { formatDateToString } from "../utils";

// while an event's value is always of type string
// the input value can be string, string[], number, or undefined.
// with undefined making the form control uncontrolled.
// uncontrolled means value are only dispatched, not received

interface RowProps { 
  name: string;
  type?: string;
  validationName?: string;
  children?: React.ReactNode;
};
const Row = ({ name, type = "text", validationName, children }: RowProps) => {
  return (
    <div style={{marginBottom: '1rem', textAlign: 'right'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {name}: {children ?? <Field name={name} type={type} />}
      </div>
      
      <ValidationMessage name={validationName ?? name} />
    </div>
  );
}

export const Body = () => {
  const formik = useFormikContext<CustomerResponse>();
  const formatDate = (date: any) => date && formatDateToString(date, 'yyyy-MM-dd');

  return (
    <div style={{width: '300px'}}>
      <Row name="age" type="number" />
      <Row name="email" type="email" />
      
      <Row name="dayOfBirth">
        <input type="date" value={formatDate(formik.values.dayOfBirth)} onChange={event => {
          formik.setFieldValue('dayOfBirth', new Date(event.currentTarget.value))
        }} />
      </Row>
      
      <Row name="dayOfDeath" validationName="datesOrder">
        <input type="date" value={formatDate(formik.values.dayOfDeath)} onChange={event => {
          formik.setFieldValue('dayOfDeath', new Date(event.currentTarget.value))
        }} />
      </Row>

      <Row name="withPets" type="checkbox" />

      {formik.values.withPets && (
        <div style={{ textAlign: 'right' }}>
          <FieldArray name="pets">
            {(formikArrayHelpers: any) => (
              <>
                {formik.values.pets.map((pet: any, idx: number) => (
                  <div key={idx}>
                    {/* TODO app craches when input gets empty */}
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
              </>
            )}
          </FieldArray>
          <ValidationMessage name="pets" />
        </div>
      )}
    </div>
  );
};
