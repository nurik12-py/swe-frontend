export default interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatar: string;
  role: string;
  admin: boolean;
}
