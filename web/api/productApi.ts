import { type ProductsPaginate } from "~/interfaces/product.interface";

export const getProducts = async (page: number = 1): Promise<ProductsPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<ProductsPaginate>(`${config.public.apiUrl}/products?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response as ProductsPaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
