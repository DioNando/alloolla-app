import { getCategories } from '@/api/categoryApi'
import { type CategoryInterface } from "~/interfaces/category.interface";

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [] as CategoryInterface[],
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await getCategories(1);
        this.categories = response.data;
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
  },
});
