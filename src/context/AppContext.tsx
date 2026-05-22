import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, CartItem } from '../types';
import { getProducts, getOrders, saveProducts } from '../lib/store';
import { toast } from 'sonner';

interface AppContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);

  const addToCart = (product: Product) => {
    if (product.status === 'sold') {
      toast.error('This product is already sold.');
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const updateProduct = (updated: Product) => {
    const newProducts = products.map(p => p.id === updated.id ? updated : p);
    saveProducts(newProducts);
    refreshData();
    toast.success('Product updated successfully!');
  };

  const addProduct = (newProduct: Product) => {
    const newProducts = [newProduct, ...products];
    saveProducts(newProducts);
    refreshData();
    toast.success('Product added successfully!');
  };

  return (
    <AppContext.Provider value={{ 
      products, 
      orders, 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      updateProduct, 
      addProduct,
      refreshData 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};