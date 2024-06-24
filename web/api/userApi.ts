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
