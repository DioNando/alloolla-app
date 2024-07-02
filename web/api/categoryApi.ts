// TODO: change article to category  

import { type ArticlesPaginate } from "~/interfaces/article.interface";

export const getArticles = async (page: number = 1): Promise<ArticlesPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<ArticlesPaginate>(`${config.public.apiUrl}/articles?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as ArticlesPaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
