import type { Links, Meta } from "./pagination.interface";
import type { UserInterface } from "./user.interface";

export interface CategoryInterface {
  id?: number; 
  name: string;
  slug?: string;
  description?: string;
  display?: string;
  id_category_wp?: number;
  user : UserInterface;
}

export interface CategoriesPaginate {
  data: CategoryInterface[];
  links: Links;
  meta: Meta;
}