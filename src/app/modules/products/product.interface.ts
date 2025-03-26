export interface IProduct {
  name: string;
  brand: string;
  price: number;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  image: string;
  quantity: number;
  rating: number;
  inStock: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}
