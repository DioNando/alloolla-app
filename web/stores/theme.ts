export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDark: true as boolean,
  }),
  actions: {
    async setDark(value: boolean) {
      this.isDark = value;
    },
  },
});
