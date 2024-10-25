export interface CategoryModel {
  id: number;
  name: string;
}

export interface FoodModel {
  id: number;
  name: string;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  category: string;
}

export interface ContactModel {
  name: string;
  email: string;
  phone: string;
  content: string;
}
