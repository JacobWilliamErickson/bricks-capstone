import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems:[],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    id: 1
  },
  reducers: {
    addToCart: (state,action) => {
      state.cartItems.push(action.payload)
      toast.success("added to cart",{position: "bottom-center", autoClose:1000})
    },
  removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        return state;
      });
    },


    increaseQ: (state,action)=>{
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].quantity+=1
    },
    decreaseQ: (state,action)=>{
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if(state.cartItems[itemIndex].quantity>1){
        
        state.cartItems[itemIndex].quantity-=1
      }
      else{
        console.log('cant')
      }
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    increaseID(state,action){
      state.id++
    }


    
  },
});

export const { addToCart, removeFromCart, increaseQ,decreaseQ, getTotals,increaseID} = cartSlice.actions;
export default cartSlice.reducer;