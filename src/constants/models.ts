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

export interface OrderModel {
  id: number;
  orderTime: string;
  numFood: number;
  foodPrice: number;
  totalPrice: number;
  status: string;
  isPaid: boolean;
  observations?: string;
  foodId: number;
  guestId: number;
}

export interface GuestModel {
  id: number;
  fullName: string;
  email: string;
  nationalID?: string;
  address: string;
  phone: string;
}

export interface FormData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  observations?: string;
}
