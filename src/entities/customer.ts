import * as Yup from "yup";
import { isBefore } from "date-fns";

export interface CustomerResponse {
  id: number;
  age?: number;
  email?: string;
  dayOfBirth?: string;
  dayOfDeath?: string;
  withPets: boolean;
  pets: { name: string }[];
}

export interface CustomerRequest {
  id: number;
  age: number;
  email: string;
  dayOfBirth?: string;
  dayOfDeath?: string;
  withPets: boolean;
  pets: { name: string }[];
}

// hydrate Formik with the whole server response or only a part and merge in Formik's onSubmit callback.
// all attributes represented via input fields need initial values! null and undefined are not possible.
export const getCustomerFormikInitialValue = (
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
  dayOfBirth: Yup.string().test(
    "birthday before death",
    "the birthday must be before the day of death",
    function(dayOfBirth) {
      // TODO 
      return isBefore(new Date(dayOfBirth as any), new Date(this.parent.dayOfDeath));
    }
  ),
  dayOfDeath: Yup.string().test(
    "death after birth",
    "the day of death must be after the birthday",
    function(dayOfDeath) {
      // TODO
      return isBefore(new Date(this.parent.dayOfBirth), new Date(dayOfDeath as any));
    }
  ),
  // custom field as the root object can't be validated in Formik
  // datesCompared: Yup.boolean().when(["dayOfBirth", "dayOfDeath"], {
  //   is: (dayOfBirth, dayOfDeath) =>
  //     isBefore(new Date(dayOfDeath), new Date(dayOfBirth)),
  //   then: Yup.boolean().required("the birthday must be before the day of death")
  // }),
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
