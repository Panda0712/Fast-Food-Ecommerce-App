import React, {ReactNode, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useEffect, useState} from 'react';

type CartItem = {
  id: number;
  foodName: string;
  image: string;
  regularPrice: number;
  discount: number;
  quantity: number;
  totalPrice: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider = ({children}: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Lỗi lấy dữ liệu giỏ hàng: ', error);
      }
    };
    loadCart();
  }, []);

  const saveCart = async (newCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    } catch (error) {
      console.error('Lỗi lưu thông tin giỏ hàng: ', error);
    }
  };

  const addToCart = (item: CartItem) => {
    const checkedFood = cart.find(food => food.id === Number(item.id));
    if (checkedFood) {
      const newCart = cart.map(food =>
        food.id === Number(item.id)
          ? {...food, quantity: food.quantity + 1}
          : food,
      );
      saveCart(newCart);
    } else {
      const updateCart = [...cart, item];
      saveCart(updateCart);
    }
  };

  const handleIncrement = (id: number) => {
    const newCart = cart.map(food =>
      food.id === Number(id) ? {...food, quantity: food.quantity + 1} : food,
    );
    saveCart(newCart);
  };

  const handleDecrement = (id: number) => {
    const foodToDecrement: any = cart.find(food => food.id === Number(id));
    if (foodToDecrement.quantity === 1) {
      removeFromCart(id);
    } else {
      const newCart = cart.map(food =>
        food.id === Number(id) ? {...food, quantity: food.quantity - 1} : food,
      );
      saveCart(newCart);
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    saveCart(newCart);
  };

  const resetCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCart([]);
    } catch (error) {
      console.error('Lỗi reset giỏ hàng: ', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        handleDecrement,
        handleIncrement,
        resetCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export default CartProvider;
