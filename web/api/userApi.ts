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

export const getUser = async (id: number): Promise<any> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(`${config.public.apiUrl}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as any;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
