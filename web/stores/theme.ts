import destr from "destr";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDark: destr(useCookie("isDark").value) as boolean,
  }),
  actions: {
    async setDark(value: boolean) {
      this.isDark = value;
      const isDarkCookie = useCookie("isDark");
      isDarkCookie.value = JSON.stringify(value);
    },
  },
});
