import { CATEGORY } from 'src/common/enum/category.enum';

export interface ICreateCompany {
  fantasyName: string;

  legalName: string;
  foundationDate: Date;
  legalDocument: string;
  contact: number;
  address?: string;

  about: string;

  category: CATEGORY;

  user: string;

  website?: string;

  validated: boolean;

  createDate: Date;
}
