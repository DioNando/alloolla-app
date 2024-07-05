import type { Links, Meta } from "./pagination.interface";
import type { UserInterface } from "./user.interface";

export interface CategoryInterface {
  id?: number; 
  name: string;
  user : UserInterface
}

export interface CategoriesPaginate {
  data: CategoryInterface[];
  links: Links;
  meta: Meta;
}