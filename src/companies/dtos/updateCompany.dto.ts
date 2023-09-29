import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CATEGORY } from 'src/common/enum/category.enum';

export class UpdateCompanyDto {
  @IsOptional()
  @MinLength(3, { message: 'Nome de fantasia deve ter no mínimo 3 caracteres' })
  fantasyName: string;

  @IsOptional()
  @MinLength(3, { message: 'Nome legal deve ter no mínimo 3 caracteres' })
  legalName: string;

  @IsOptional()
  @IsDateString()
  foundationDate?: Date;

  @IsOptional()
  @Length(14, 14, { message: 'Documento deve ter 14 dígitos' })
  legalDocument?: string;

  @IsNumber()
  @IsOptional()
  contact: number;

  @IsOptional()
  @IsString()
  address?: string;

  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  @IsOptional()
  about?: string;

  @IsEnum(CATEGORY)
  @IsOptional()
  category?: CATEGORY;

  @IsOptional()
  website?: string;

  @IsOptional()
  @IsBoolean()
  validated?: boolean;

  updateDate: Date;
}
