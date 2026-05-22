import { Product, Order, OrderStatus } from '../types';

const PRODUCTS_KEY = 'davidelite_products';
const ORDERS_KEY = 'davidelite_orders';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Elite Men's Trouser",
    category: 'Men',
    price: 500,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/men-trouser-1-f5e368be-1779425430403.webp',
    description: "High quality professional men's dress trousers."
  },
  {
    id: '2',
    name: "Classic Men's Shirt",
    category: 'Men',
    price: 350,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/men-shirt-1-57e0128d-1779425430081.webp',
    description: "Elegant white dress shirt, slim fit."
  },
  {
    id: '3',
    name: "Premium Silk Tie",
    category: 'Men',
    price: 150,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/men-tie-1-b71dbe33-1779425430204.webp',
    description: "Elegant silk necktie for a professional look."
  },
  {
    id: '4',
    name: "Elite Trench Coat (M)",
    category: 'Unisex',
    price: 550,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/trench-coat-1-92ccc969-1779425431262.webp',
    description: "Stylish beige unisex trench coat, Medium size."
  },
  {
    id: '5',
    name: "Elite Trench Coat (L)",
    category: 'Unisex',
    price: 750,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/trench-coat-1-92ccc969-1779425431262.webp',
    description: "Stylish beige unisex trench coat, Large size."
  },
  {
    id: '6',
    name: "Ladies' Fashion Trouser (S)",
    category: 'Ladies',
    price: 250,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/ladies-trouser-1-c501140b-1779425430928.webp',
    description: "Modern ladies trousers, Small size."
  },
  {
    id: '7',
    name: "Ladies' Fashion Trouser (M)",
    category: 'Ladies',
    price: 300,
    status: 'available',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/4f9cdac1-c020-4cd0-bd41-c6cfce422eae/ladies-trouser-1-c501140b-1779425430928.webp',
    description: "Modern ladies trousers, Medium size."
  }
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event('storage-update'));
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const updateOrderStatus = (orderId: string, status: OrderStatus) => {
  const orders = getOrders();
  const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
};