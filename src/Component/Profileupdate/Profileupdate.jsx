import React, { useState, useEffect } from 'react';
import InputField from '../../InputField';
import '../../App.css';
import CONSTANTS from '../../Constant/Constants';

export default function ProfileUpdate() {
 

  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    email: '',
    city: '',
    country: '',
    address: '',
    phone_number: '',
    password: '',
    status: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      let token = localStorage.getItem('token')
      const response = await fetch(`${CONSTANTS.BASE_URL}/userData` ,{
        method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}` ,
                    'Access-Control-Allow-Origin': '*',
                } , 
                
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFormData(data);                   // Update form data with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    setFormErrors({
      ...formErrors,
      [name]: ''         // Clear the error message for the current input field
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      registerUser();
    } else {
      setFormErrors(errors);
    }
  };




  const registerUser = async () => {
    try {
      let token = localStorage.getItem('token')
      const response = await fetch(`${CONSTANTS.BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` ,
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
    }
    catch (error) {
      console.error('Error updating data:', error);
    }
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

     if (!/^\d{10}$/.test(data.phone_number)) {
      errors.phone_number = 'Invalid mobile number';
    }
   
  
    
    return errors;
  };

  
 
  return (
    <div className='spaceup' >
      <h2>Update Form</h2>
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
         // style={{ borderColor: formErrors.email ? 'red' : '' }}

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
      
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button type="submit">UPDATE</button>
        </div>

      </form>
    </div>
  );
}
