import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import { fr } from "vuetify/locale";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#ffffff",
    surface: "#ffffff",
    primary: "#111111",
    secondary: "#6b95ff",
    error: "#ff4d4d",
    info: "#4da6ff",
    success: "#4dff88",
    warning: "#ffb84d",
  },
};

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#1c1d23",
    surface: "#343640",
    primary: "#f1f1f1",
    secondary: "#6b95ff",
    error: "#ff4d4d",
    info: "#4da6ff",
    success: "#4dff88",
    warning: "#ffb84d",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    locale: {
      locale: "fr",
      fallback: "en",
      messages: { fr },
    },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
        myCustomDarkTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});
