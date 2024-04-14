import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      item.total_price = parseFloat(item.total_price) || 0; 
      state.items.push(item);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
       
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    addCustomDish: (state, action) => {
      let newItem = action.payload;
      newItem.quantity = 1 
      newItem.total_price = parseFloat(newItem.total_price); 
      state.items.push(newItem);
    },
    updateCustomDish: (state, action) => {
      const { id, newData } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const updatedItem = { ...state.items[itemIndex], ...newData };
        updatedItem.total_price = parseFloat(newData.total_price) || 0;
        state.items[itemIndex] = updatedItem;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  addCustomDish,
  updateCustomDish
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
