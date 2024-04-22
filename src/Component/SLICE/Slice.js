// Create a file named userRegistrationSlice.js for defining the slice
import { createSlice } from '@reduxjs/toolkit';

export const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState: {
    formData: {
      first_name: '',
      second_name: '',
      email: '',
      dob: '',
      city: '',
      country: '',
      address: '',
      phone_number: '',
      password: '',
      status: 'active'
    },
    formErrors: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFormErrors: (state, action) => {
      state.formErrors = action.payload;
    },
    clearFormErrors: (state) => {
      state.formErrors = {};
    },
    clearFormData: (state) => {
      state.formData = {
        first_name: '',
        second_name: '',
        email: '',
        dob: '',
        city: '',
        country: '',
        address: '',
        phone_number: '',
        password: '',
        status: 'active'
      };
    },
  },
});

export const { setFormData, setFormErrors, clearFormErrors, clearFormData } = userRegistrationSlice.actions;

export const selectFormData = (state) => state.userRegistration.formData;
export const selectFormErrors = (state) => state.userRegistration.formErrors;

export default userRegistrationSlice.reducer;
