import { CATEGORY } from 'src/common/enum/category.enum';

export interface IUpdateCompany {
  fantasyName?: string;

  legalName?: string;

  foundationDate?: Date;

  legalDocument?: string;

  contact?: number;

  address?: string;

  about?: string;

  category?: CATEGORY;

  website?: string;

  updateDate: Date;
}
