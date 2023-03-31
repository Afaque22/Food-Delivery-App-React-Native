import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './CartSlice'


const MyStore = configureStore({
    reducer:{
        cart : CartReducer,
    },
})
export default MyStore;