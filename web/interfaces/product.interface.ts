import type { Links, Meta } from "./pagination.interface";
import type { UserInterface } from "./user.interface";

export interface ProductInterface {
  id?: number; 
  name: string;
  // type: string;
  regular_price: number;
  description: string;
  user : UserInterface
  // short_description: string;
  // categories: categorie[];
  // images: image[];
}

// TODO: add UserInterface

interface image {
    src: string;
}

interface categorie {
    id: number;
}

export interface ProductsPaginate {
  data: ProductInterface[];
  links: Links;
  meta: Meta;
}


// export const exampleProduct: ProductInterface = {
//   name: "Premium Quality",
//   type: "simple",
//   regular_price: 21.99,
//   description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
//   short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//   categories: [
//     {
//       id: 15
//     }
//   ],
//   images: [
//     {
//       src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
//     },
//     {
//       src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
//     }
//   ]
// }