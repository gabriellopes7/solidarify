import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

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

  user: string;

  @IsOptional()
  about?: string;
}
