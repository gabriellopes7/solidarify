import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
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

  @IsNotEmpty()
  @Length(11, 11, { message: 'CPF deve ter 11 dígitos' })
  document: string;

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

  createDate: Date;
}
