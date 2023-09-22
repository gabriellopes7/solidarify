// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ICreateUserInterface {
  email: string;
  password: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  birthDate: Date;
  contact?: number;
  isPrivate: boolean;
}
