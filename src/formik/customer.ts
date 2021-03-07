import * as Yup from "yup";
import { isBefore, isValid } from "date-fns";
import { CustomerResponse } from "../entities/customer";
import { formatDateToString, validateDatesOrder } from "../utils";

/* 
 * React requires initial values (neither undefined nor null) for controlled form fields.
 * But Product often does not want this, but empty fields.
 * This asks for empty strings as initial values, what just adds to the type chaos form inputs introduce.
 */
export const hydrateCustomer = (
    customer: CustomerResponse
  ): any => ({
    ...customer,
    age: customer.age || "",
    email: customer.email || "",
    dayOfBirth: customer.dayOfBirth,
    dayOfDeath: customer.dayOfDeath,
    pets: customer.pets || []
  });
  
  export const CustomerYupSchema = Yup.object({
    age: Yup.number()
      .min(18, "no minors, sweety")
      .required(),
    email: Yup.string()
      .required()
      .email(),
    dayOfBirth: Yup.date().required(),
    dayOfDeath: Yup.date(),
    datesOrder: Yup.mixed().test(
        'birth before death',
        // see also https://github.com/jquense/yup/pull/556#issuecomment-641988687
        // to access children of sibling attributes
        function(this: Yup.TestContext) {
            const {dayOfBirth, dayOfDeath}: { dayOfBirth?: Date; dayOfDeath?: Date } = this.parent;
            return validateDatesOrder.call(this, dayOfBirth, dayOfDeath);
        },
    ),
    withPets: Yup.boolean(),
    pets: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("pet name is needed")
        })
      )
      .when(["withPets"], {
        is: true,
        then: Yup.array().min(1)
      })
  });
  