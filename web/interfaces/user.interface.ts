export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

export interface UserWithTokenInterface {
  user: UserInterface;
  token: string;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface UsersPaginate {
  data: UserInterface[];
  links: Links;
  meta: Meta;
}

export const exampleUserWithToken: UserWithTokenInterface = {
  user: {
    id: 12,
    name: "Jhon Doe",
    email: "jhon@example.org",
  },
  token: "74|Kdx50UAay37RXDqNwhAHSMvNdW2NV8qylDI8xtoi04c11483"
};
