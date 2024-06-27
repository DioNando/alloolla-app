// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      apiWooCommerceUrl: process.env.API_WOO_COMMERCE_URL,
      apiWooCommerceKey: process.env.API_WOO_COMMERCE_KEY,
      apiWooCommerceSecret: process.env.API_WOO_COMMERCE_SECRET,
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  css: ["~/assets/scss/style.scss"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
