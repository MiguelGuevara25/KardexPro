export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export interface SaleItem {
  id: number;
  quantity: number;
  totalPrice: number;
  dateSale: string;
  product: Product;
}

export interface FormSaleItem {
  product: number;
  price: number;
  quantity: number;
  stock: number;
  totalPrice: number;
}
