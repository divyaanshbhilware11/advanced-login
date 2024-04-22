import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    token: '',
    error: null,
  },
  
  reducers: {
    setLoginData: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoginData, setToken, setError, clearError } = loginSlice.actions;

export const selectEmail = (state) => state.login.email;
export const selectPassword = (state) => state.login.password;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
