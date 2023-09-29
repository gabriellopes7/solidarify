import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdateIndividualDto {
  @MinLength(3)
  @IsOptional()
  firstName?: string;

  @MinLength(3)
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @IsInt()
  @IsOptional()
  contact?: number;

  //TODO adicionar endpoint para atualizar isPrivate
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @IsOptional()
  about?: string;

  updateDate: Date;
}
