export interface CustomerResponseDto {
  id: number;
  age?: number;
  email?: string;
  dayOfBirth?: string;
  dayOfDeath?: string;
  withPets: boolean;
  pets: { name: string }[];
}

export interface CustomerResponse {
  id: number;
  age?: number;
  email?: string;
  dayOfBirth?: Date;
  dayOfDeath?: Date;
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

export const mapCustomerResponseDto = (dto: CustomerResponseDto): CustomerResponse => ({
  ...dto,
  dayOfBirth: dto.dayOfBirth ? new Date(dto.dayOfBirth) : undefined,
  dayOfDeath: dto.dayOfDeath ? new Date(dto.dayOfDeath) : undefined,
})