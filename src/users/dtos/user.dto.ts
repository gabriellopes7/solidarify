import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserType } from 'src/entities/userType.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  isActive: boolean;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsDateString()
  readonly birthDate;

  contact?: number;

  isPrivate: boolean;

  @IsNotEmpty()
  userType: UserType;
}
