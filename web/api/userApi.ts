import { type UserInterface, type UsersPaginate } from "~/interfaces/user.interface";

export const getUsers = async (page: number = 1): Promise<UsersPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<UsersPaginate>(`${config.public.apiUrl}/users?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as UsersPaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const getUser = async (id: number): Promise<UserInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<UserInterface>(`${config.public.apiUrl}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as UserInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const addUser = async (data: UserInterface): Promise<UserInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<UserInterface>(`${config.public.apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    });

    return response as UserInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
