import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import type { CategoryInterface } from "~/interfaces/category.interface";

export const getCategoriesWooCommerce = async (): Promise<any> => {
  try {
    const config = useRuntimeConfig();

    // Initialiser OAuth
    const oauth = new OAuth({
      consumer: {
        key: config.public.apiWooCommerceKey,
        secret: config.public.apiWooCommerceSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(
          CryptoJS.enc.Base64
        );
      },
    });

    // Construire la requête
    const request_data = {
      url: `${config.public.apiWooCommerceUrl}/products/categories`,
      method: "GET",
    };

    // Générer les en-têtes OAuth
    const headers = oauth.toHeader(oauth.authorize(request_data));

    // Ajouter le header Content-Type
    headers["Content-Type"] = "application/json";

    const response = await $fetch<any>(request_data.url, {
      method: request_data.method,
      headers: {
        ...headers,
      },
    });

    return response as any;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};

export const addCategoryWooCommerce = async (
  data: any
): Promise<any> => {
  try {
    const config = useRuntimeConfig();

    const oauth = new OAuth({
      consumer: {
        key: config.public.apiWooCommerceKey,
        secret: config.public.apiWooCommerceSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(
          CryptoJS.enc.Base64
        );
      },
    });

    const request_data = {
      url: `${config.public.apiWooCommerceUrl}/products/categories`,
      method: "POST",
    };

    // Générer les en-têtes OAuth
    const headers = oauth.toHeader(oauth.authorize(request_data));

    // Ajouter le header Content-Type
    headers["Content-Type"] = "application/json";

    const response = await $fetch<any>(request_data.url, {
      method: request_data.method,
      headers: {
        ...headers,
      },
      body: {
        name: data.name,
        // slug: data.slug,
        display: data.display,
        description: data.description,
      }
    });

    return response as any;
  } catch (err) {
    console.error("Erreur lors de la requête.", err);
    throw err;
  }
};
