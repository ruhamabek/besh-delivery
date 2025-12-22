import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

// Types
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
}

export interface CartItem extends Dish {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: number) => void;
  clearCart: () => void;
  getItemQuantity: (dishId: number) => number;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (dish: Dish) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dish.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: number) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === dishId);

      if (existingItem && existingItem.quantity > 1) {
        return currentItems.map((item) =>
          item.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return currentItems.filter((item) => item.id !== dishId);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (dishId: number) => {
    const item = items.find((item) => item.id === dishId);
    return item ? item.quantity : 0;
  };

  const cartTotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [items]);

  const cartCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

   
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

 
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}