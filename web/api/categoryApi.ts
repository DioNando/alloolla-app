import { type CategoriesPaginate } from "~/interfaces/category.interface";

export const getCategories = async (page: number = 1): Promise<CategoriesPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<CategoriesPaginate>(`${config.public.apiUrl}/categories?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as CategoriesPaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
