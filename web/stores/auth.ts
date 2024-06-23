interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const config = useRuntimeConfig();
      try {
        this.loading = true;
        const data: any = await $fetch(config.public.apiUrl + "/login", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            email,
            password,
          },
        });

        if (data && data.token) {
          const token = useCookie("token");
          token.value = data.token; // set token to cookie
          this.authenticated = true; // set authenticated state value to true
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        this.loading = false;
      }
    },
    async logUserOut() {
      const token = useCookie("token");
      const config = useRuntimeConfig();
      try {
        const res: any = await $fetch(config.public.apiUrl + "/logout", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        });

        if (res?.success) {
          this.authenticated = false; // set authenticated state value to false
          token.value = null; // clear the token cookie
          navigateTo("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
});
