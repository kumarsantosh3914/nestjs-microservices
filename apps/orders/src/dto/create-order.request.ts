import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}

export class UpdateOrderRequest {
  @IsOptional() // This decorator makes the field optional
  @IsString()
  name?: string;

  @IsOptional() // This decorator makes the field optional
  @IsString()
  price?: number;

  @IsOptional()
  phoneNumber?: string;
}
