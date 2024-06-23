export interface UserInterface {
  id: number;
  name: string;
  email: string;
  hashedPassword: string; // Note: securely hashed password
  avatarUrl?: string; // URL de l'image de l'avatar de l'utilisateur (optionnel)
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Indique si le compte utilisateur est actif
  role: "admin" | "user" | "guest"; // Rôle de l'utilisateur dans le système
}

export const exampleUser: UserInterface = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  hashedPassword: "hashedSecurePassword", // Haché pour des raisons de sécurité
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  role: "user",
};
