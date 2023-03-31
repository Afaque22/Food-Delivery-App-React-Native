import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addCartItem: (state, action) => {
            const itemInCart = state.cart.find((item) => item.itemName == action.payload.itemName)
            if (itemInCart) {
                itemInCart.quantity++
                itemInCart.total=itemInCart.price*itemInCart.quantity  
            } 
            else {   
                state.cart.push({ ...action.payload, quantity: 1});
            }
                
            
            
        },
        removeCartItem: (state, action) => {
            const removeFromCart = state.cart.filter((item) => item.itemName !== action.payload.itemName);
            state.cart = removeFromCart;
        },
        incrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.itemName == action.payload.itemName)
            itemInCart.quantity++
            itemInCart.total=itemInCart.price*itemInCart.quantity     
        },
        decrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.itemName == action.payload.itemName)
            if (itemInCart.quantity == 1) {
                const removeFromCart = state.cart.filter((item) => item.itemName !== action.payload.itemName);
                state.cart = removeFromCart;
            } else {
                itemInCart.quantity--
                itemInCart.total =itemInCart.price*itemInCart.quantity 
                

            }
        },
        clearList: (state) => {
            const deleteCart = []
            state.cart = deleteCart
          },
          gettingUID: (state)=>{
            let id = undefined
             state.cart.forEach(element);
            function element(item) {
              id = item.uid
            } 

            const replaceInCart = state.cart.filter((v) => v.uid == id);
            state.cart = replaceInCart;
          }  
        
    }
})

export const { addCartItem, removeCartItem, incrementQuantity, decrementQuantity,clearList,gettingUID} = CartSlice.actions;
export default CartSlice.reducer;