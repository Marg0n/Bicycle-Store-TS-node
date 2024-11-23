export interface IProduct {
  name: string;
  brand: string;
  type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}
