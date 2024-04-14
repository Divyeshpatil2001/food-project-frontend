import React, { createContext, useContext, useReducer } from 'react';


const initialCartState = {
  cart: [],
};


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
       
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
   
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }
    case 'REMOVE_FROM_CART':
      
      const updatedCart = state.cart.filter((product) => product.id !== action.payload);
      return { ...state, cart: updatedCart };
    case 'INCREMENT_QUANTITY':
  
      const incrementedCart = state.cart.map((product) =>
        product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
      );
      return { ...state, cart: incrementedCart };
    case 'DECREMENT_QUANTITY':
     
      const decrementedCart = state.cart.map((product) =>
        product.id === action.payload ? { ...product, quantity: product.quantity - 1 } : product
      );
      return { ...state, cart: decrementedCart };
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);


export const useDispatchCart = () => {
  const { dispatch } = useCart();
  return dispatch;
};
