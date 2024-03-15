import React, { useState, useEffect } from 'react';
import InputField from '../../InputField';
import '../../App.css';

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
      const response = await fetch(`http://192.168.193.63:8000/userData` ,{
        method: 'GET',
                headers: {
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}` 
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
      const response = await fetch('http://192.168.193.63:8000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
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

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!/^\d{10}$/.test(data.phone_number)) {
      errors.phone_number = 'Invalid mobile number';
    }
    return errors;
  };
 

  return (
    <div >
      <h2>Update Form</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          label="Last Name"
          name="second_name"
          value={formData.second_name}
          onChange={handleInputChange}
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
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />
        <InputField
          type="text"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
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
