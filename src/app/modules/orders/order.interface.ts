export interface IOrder {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  createdAt?: string | null;
  updatedAt?: string | null;
}
