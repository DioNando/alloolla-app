import { getReports } from "~/api/wooCommerce/reportWooCommerceApi";

export const useWooCommerceStore = defineStore("wooCommerceStore", {
  state: () => ({
    reports: null as any,
  }),
  actions: {
    async fetchReports() {
      this.reports = await getReports();
    },
  },
});
