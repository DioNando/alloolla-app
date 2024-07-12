import { type Meta, type Links } from "./pagination.interface";

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password?: string;
  is_admin?: boolean;
}

export interface UserWithTokenInterface {
  user: UserInterface;
  token: string;
}

export interface UsersPaginate {
  data: UserInterface[];
  links: Links;
  meta: Meta;
}

export const exampleUser: UserInterface = {
  id: 12,
  name: "Jhon Doe",
  email: "jhon@example.org",
};
