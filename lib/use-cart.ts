import { useEffect, useState } from "react";
import { Product, ProductStorage } from "./types";

export default function useCart() {
  const [cart, setCart] = useState<ProductStorage[]>([]);

  useEffect(() => {
    function updateCart() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const newCart = JSON.parse(cart);
        setCart(newCart as ProductStorage[]);
      } else {
        setCart([]);
      }
    }
    updateCart();

    window.addEventListener('cart-local-storage', updateCart as EventListener, false)

    return () => {
      window.removeEventListener('cart-local-storage', updateCart as EventListener)
    }
  }, []);

  return {
    cart,
    count: cart.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0),
    total: cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0),
    add: (product: Product) => {
      const newCart = [...cart];
      const isInCart = newCart.find((p) => p.id === product.id);
      if (isInCart) {
        isInCart.quantity++;
      } else {
        newCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new StorageEvent("cart-local-storage"));
    },
    updateQuantity: (productId: number, quantity: number) => {
      const newCart = cart.map((p) => {
        if (p.id === productId) {
          return { ...p, quantity };
        }
        return p;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new StorageEvent("cart-local-storage"));
    },
    remove: (productId: number) => {
      const newCart = cart.filter((p) => p.id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.dispatchEvent(new StorageEvent("cart-local-storage"));
    }
  };
}