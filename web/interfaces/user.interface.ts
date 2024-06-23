export interface UserInterface {
  id: number;
  name: string;
  email: string;
}

export interface UserWithTokenInterface {
  user: UserInterface;
  token: string;
}

export const exampleUserWithToken: UserWithTokenInterface = {
  user: {
    id: 12,
    name: "Jhon Doe",
    email: "jhon@example.org",
  },
  token: "74|Kdx50UAay37RXDqNwhAHSMvNdW2NV8qylDI8xtoi04c11483"
};
