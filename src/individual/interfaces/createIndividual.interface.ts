export interface ICreateIndividual {
  firstName: string;

  lastName: string;

  birthDate: Date;

  contact?: number;

  isPrivate?: boolean;

  user: string;

  about?: string;
}
