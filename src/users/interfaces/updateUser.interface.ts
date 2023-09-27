import { Company } from 'src/entities/company.entity';
import { Individual } from 'src/entities/individual.entity';

export interface IUpdateUser {
  email?: string;
  refreshToken?: string;
  isActive?: boolean;
  individual?: Individual;
  company?: Company;
}
