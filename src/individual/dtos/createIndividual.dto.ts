import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateIndividualDto {
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsInt()
  @IsOptional()
  contact?: number;

  //TODO adicionar endpoint para atualizar isPrivate
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  userId: string;

  user: User;

  @IsOptional()
  about?: string;
}
