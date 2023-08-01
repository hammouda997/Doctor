export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  brand?: string;
  supplier?: string;
  stock: number;
  stockAlert?: number;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}
