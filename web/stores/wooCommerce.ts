import { getReports } from "~/api/wooCommerce/reportWooCommerceApi";

export const useWooCommerceStore = defineStore("wooCommerceStore", {
  state: () => ({
    reports: null as any,
    loading: false,
  }),
  actions: {
    async fetchReports() {
      this.reports = await getReports();
      this.loading = true;
    },
  },
});
