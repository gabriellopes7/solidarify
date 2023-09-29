export interface ICreateIndividual {
  firstName: string;

  lastName: string;

  birthDate: Date;

  document: string;

  contact?: number;

  isPrivate?: boolean;

  user: string;

  about?: string;

  createDate: Date;
}
