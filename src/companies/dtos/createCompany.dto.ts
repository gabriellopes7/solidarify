import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CATEGORY } from 'src/common/enum/category.enum';

export class CreateCompanyDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Nome de fantasia deve ter no mínimo 3 caracteres' })
  fantasyName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Nome legal deve ter no mínimo 3 caracteres' })
  legalName: string;

  @IsNotEmpty()
  @IsDateString()
  foundationDate: Date;

  @IsNotEmpty()
  @Length(14, 14, { message: 'Documento deve ter 14 dígitos' })
  legalDocument: string;

  @IsNotEmpty()
  @IsNumber()
  contact: number;

  address?: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  about: string;

  @IsEnum(CATEGORY)
  category: CATEGORY;

  user: string;

  website?: string;

  validated: boolean;

  createDate: Date;
}
