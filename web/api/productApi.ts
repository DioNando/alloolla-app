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
          short_description: data.short_description,
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

// export const addProduct = async (data: ProductInterface, user_id: number): Promise<ProductInterface> => {
//   try {
//     const config = useRuntimeConfig();
//     const token = useCookie('token');

//     // Création de l'objet FormData pour envoyer les fichiers et les autres données du formulaire
//     const formData = new FormData();
//     if (data.name) {
//       formData.append('name', data.name);
//     }
//     if (data.regular_price !== undefined) {
//       formData.append('regular_price', data.regular_price.toString());
//     }
//     if (data.description) {
//       formData.append('description', data.description);
//     }
//     formData.append('user_id', user_id.toString());
//     if (data.categories) {
//       data.categories.forEach((category, index) => {
//         if (category.id) {
//           formData.append(`categories[${index}]`, category.id.toString());
//         }
//       });
//     }
//     // TODO: fix this
//     if (data.images) {
//       data.images.forEach((image, index) => {
//         if (image.src) {
//           formData.append(`images[${index}]`, image.src);
//         }
//       });
//     }

//     const response = await $fetch<any>(`${config.public.apiUrl}/products`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token.value}`,
//       },
//       body: formData,
//     });

//     return response.data as ProductInterface;
//   } catch (err) {
//     console.error('Erreur lors de la requête.', err);
//     throw err;
//   }
// };

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
