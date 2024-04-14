import { combineReducers } from 'redux';
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer, 
});

export default rootReducer;
