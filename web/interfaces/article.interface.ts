import type { UserInterface } from "./user.interface";
import type { Meta, Links } from "./pagination.interface";

export interface ArticleInterface {
  id: number;
  amount: number;
  description: string;
  name: string;
  status: string;
  userId: number;
  user: UserInterface;
}

export interface ArticlesPaginate {
    data: ArticleInterface[];
    links: Links;
    meta: Meta;
}
