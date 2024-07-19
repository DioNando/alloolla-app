import { type CategoriesPaginate, type CategoryInterface } from "~/interfaces/category.interface";

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

export const getCategoriesAll = async (): Promise<CategoriesPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<CategoriesPaginate>(`${config.public.apiUrl}/categories?includeAll=true`, {
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

export const addCategory = async (
  data: CategoryInterface,
  user_id: number
): Promise<CategoryInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          display: data.display,
          user_id: user_id,
        },
      }
    );

    return response.data as CategoryInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
