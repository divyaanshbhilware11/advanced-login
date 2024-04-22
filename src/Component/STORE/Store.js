// Create a file named store.js for configuring Redux store
import { configureStore , combineReducers } from '@reduxjs/toolkit';
import userRegistrationReducer from '../SLICE/Slice';  
import loginReducer from '../SLICE/LoginSlice';


const rootReducer = combineReducers({
  login: loginReducer,
  userRegistration: userRegistrationReducer,
});

export default configureStore({
  reducer: rootReducer,
});
