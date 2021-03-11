import React, { useState, useEffect, createContext } from "react";

export const AppContext = createContext();

export function AppProvider(props) {
  const [cart, setCart] = useState(() => {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function handleProductDelete(id) {
    setCart(cart.filter((product) => product.id !== id));
  }

  function handleProductAdd(newProduct) {
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );

    if (existingProduct) {
      setCart(
        cart.map((product) => {
          if (product.id === newProduct.id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      );
    } else {
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  function getCartCount() {
    return cart.reduce((total, product) => total + product.quantity, 0);
  }

  function getProductFromCart(id) {
    return cart.find((product) => product.id === id);
  }

  function getTotalCart() {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  function getLineItems(price_id) {
    return cart.map((product) => {
      return { price: price_id[product.id - 1], quantity: product.quantity };
    });
  }

  const value = {
    cart,
    onProductDelete: handleProductDelete,
    onProductAdd: handleProductAdd,
    getCartCount,
    getProductFromCart,
    getTotalCart,
    getLineItems,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
