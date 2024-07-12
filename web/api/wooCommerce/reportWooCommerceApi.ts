import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

export const getReports = async (): Promise<any> => {
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
      url: `${config.public.apiWooCommerceUrl}/reports`,
      method: "GET",
    };

    const headers = oauth.toHeader(oauth.authorize(request_data));

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
