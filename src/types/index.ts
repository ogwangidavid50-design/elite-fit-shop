export type ProductStatus = 'available' | 'sold';
export type Category = 'Men' | 'Ladies' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  status: ProductStatus;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}