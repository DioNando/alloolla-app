import {
  type ProductInterface,
  type ProductsPaginate,
} from "~/interfaces/product.interface";

export const getProducts = async (
  page: number = 1
): Promise<ProductsPaginate> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<ProductsPaginate>(
      `${config.public.apiUrl}/products?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response as ProductsPaginate;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const getProduct = async (id: number): Promise<ProductInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data as ProductInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const addProduct = async (
  data: ProductInterface,
  user_id: number
): Promise<ProductInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          name: data.name,
          // type: data.type,
          regular_price: data.regular_price,
          description: data.description,
          user_id: user_id,
          categories: data.categories,
        },
      }
    );

    return response.data as ProductInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const editProduct = async (
  data: ProductInterface,
  user_id: number
): Promise<ProductInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/products/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          name: data.name,
          // type: data.type,
          regular_price: data.regular_price,
          description: data.description,
          user_id: user_id,
        },
      }
    );

    return response.data as ProductInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const deleteProduct = async (id: number): Promise<ProductInterface> => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token");

    const response = await $fetch<any>(
      `${config.public.apiUrl}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    return response.data as ProductInterface;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
