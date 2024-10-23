export interface CategoryModel {
  id: Number;
  name: string;
}

export interface FoodModel {
  id: Number;
  name: string;
  regularPrice: Number;
  discount: Number;
  description: string;
  image: string;
  category: string;
}
