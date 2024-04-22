import React , { useState } from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
const backendIP = import.meta.env.VITE_BACKEND_IP;
import CONSTANTS from '../../Constant/Constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setFormErrors, clearFormErrors, clearFormData, selectFormData, selectFormErrors } from '../SLICE/Slice';//./SLICE//Slice/userRegistrationSlice


export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();``
  const formData = useSelector(selectFormData);
  const formErrors = useSelector(selectFormErrors);

    
        const handleInputChange = (e) => {
          const { name, value } = e.target;
         
        dispatch(setFormData({ [name]:value })) ;
        dispatch(setFormErrors({ [name]: ''})) ;
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          const errors = validateForm(formData);
      
          if (Object.keys(errors).length === 0) {
            registerUser()
          } else {
            dispatch(setFormErrors(errors));
          }
        };

        const registerUser = () => {
          fetch(`${CONSTANTS.BASE_URL}/signUp`, {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log ('API Response:', data);
            dispatch(clearFormData());
            dispatch(clearFormErrors()); // Clear any existing form validation errors

            navigate('/')
          })
          .catch(error => {
            console.error('API Error:', error);
          });
        };
      
        const validateForm = (data) => {
          let errors = {};

          if(data.first_name.length > 20 ){
            errors.first_name = 'First name cannot exceed 20 characters'
          }
          else {
          
            if (!data.first_name.trim()) {
            errors.first_name = 'First name is required';
          }else if (!/^[a-zA-Z]+$/.test(data.first_name)){
            errors.first_name = 'Invalid first name'
          }}
         
           
          if(data.second_name.length > 20 ){
            errors.second_name = 'Last name cannot exceed 20 characters'
          }
          else{
          if (!data.second_name.trim()) {
            errors.second_name = 'Last name is required';
          }else if (!/^[a-zA-Z]+$/.test(data.second_name)){
            errors.second_name = 'Invalid Last name'
          }}

          if (!data.email.trim()) {
            errors.email = ' Email is required';
          } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Invalid email format';
          }

          if (!data.dob) {
            errors.dob = 'Date of birth is required';
          }

          if(data.city.length > 20 ){
            errors.city = 'City name cannot exceed 20 characters'
          }
          else{
          if (!data.city.trim()) {
            errors.city = 'City name is required';
          }else if (!/^[a-zA-Z]+$/.test(data.city)){
            errors.city = 'Invalid City name'
          }}

         
          if(data.country.length > 20 ){
            errors.country = 'Country name cannot exceed 20 characters'
          }
          else{
          if (!data.country.trim()) {
            errors.country = 'Country name is required';
          }else if (!/^[a-zA-Z]+$/.test(data.country)){
            errors.country = 'Invalid Country name'
          }}

          if(data.address.length > 30 ){
            errors.address = 'Address cannot exceed 30 characters'
          }
          else{
          if (!data.address.trim()) {
            errors.address = 'Address is required';
          }}


          if (!data.phone_number.trim()) {
            errors.phone_number = 'Mobile number is required';
          } else if (!/^\d{10}$/.test(data.phone_number)) {
            errors.phone_number = 'Invalid mobile number';
          }
          
          if (!data.password.trim()) {
            errors.password = 'Password is required';
          } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
          } else if (!/\d/.test(data.password)) {
            errors.password = 'Password must contain at least one digit';
          } else if (!/[a-zA-Z]/.test(data.password)) {
            errors.password = 'Password must contain at least one letter';
          }
          
          return errors;
        };
      
    return (
    
    <div className='spaceup' >
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          error={formErrors.first_name}

        />
        <InputField
          type="text"
          label="Last Name"
          name="second_name"
          value={formData.second_name}
          onChange={handleInputChange}
          error={formErrors.second_name}
        />

        <InputField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
        />

        <InputField
          type="date"
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          error={formErrors.dob}
        />
        <InputField
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          error={formErrors.city}
        />
        <InputField
          type="text"
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          error={formErrors.country}
        />
        <InputField
          type="text"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={formErrors.address}
        />
        <InputField
          type="tel"
          label="Mobile Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          error={formErrors.phone_number}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
        />
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
          
      </form>
    </div>
    
  );
    }

