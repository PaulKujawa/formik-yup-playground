import React from "react";
import { CustomerResponse } from "./entities/customer";

export const useMockServerResponse = (): CustomerResponse | null => {
  // null as initial value is what one would have as Redux initial state
  const [
    serverResponse,
    setServerResponse
  ] = React.useState<CustomerResponse | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setServerResponse({
        id: 1,
        age: 12,
        dayOfBirth: "01.01.1937",
        dayOfDeath: "12.04.2020",
        withPets: false,
        pets: [{ name: "Odin" }, { name: "Floki" }, { name: "Freya" }]
      });
    }, 2000);
  });

  return serverResponse;
};

export const deepConversionOfEmptyStringToNull = (value: any): any => {
  if (value === "") {
    return null;
  }

  if (value === null || value === undefined || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepConversionOfEmptyStringToNull);
  }

  return Object.entries(value).reduce(
    (copy, [key, val]) => {
      copy[key] = deepConversionOfEmptyStringToNull(val);
      return copy;
    },
    {} as { [key: string]: any }
  );
};

// export const useTimeBasedRerender = () => {
//   const [rendered, setRendered] = React.useState(1);

//   React.useEffect(() => {
//     setTimeout(() => {
//       console.log('--- local state change ---');
//       setRendered(++rendered);
//     }, 1000);

//     setTimeout(() => {
//       console.log('--- store state change ---');
//       store.dispatch({type: 'ADD_RND', text: Math.random()})
//     }, 2000);
//   }, []);
// }
