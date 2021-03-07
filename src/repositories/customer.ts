import React from "react";
import { CustomerResponse, CustomerResponseDto, mapCustomerResponseDto } from "../entities/customer";

const mock: CustomerResponseDto = {
    id: 1,
    age: 12,
    dayOfBirth: "01.01.1893",
    dayOfDeath: "12.04.1950",
    withPets: false,
    pets: [{ name: "Odin" }, { name: "Floki" }, { name: "Freya" }]
};


export const useGetCustomer = (delay = 0): CustomerResponse | null => {
    const [value, setValue] = React.useState<CustomerResponse | null>(null);

    React.useEffect(() => {
        setTimeout(() => {
            setValue(mapCustomerResponseDto(mock));
        }, delay);
    }, []);

    return value;   
}