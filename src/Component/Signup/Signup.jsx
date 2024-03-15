import React , { useState } from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
const backendIP = import.meta.env.VITE_BACKEND_IP;


export default function Signup() {

        const [formData, setFormData] = useState({
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
        });
      
        const [formErrors, setFormErrors] = useState({});
    
        const handleInputChange = (e) => {
          const { name, value } = e.target;
         
          setFormData({          //usko formdata me bhi update karte jaata he 
            ...formData,
            [name]: value
          });
          setFormErrors({
            ...formErrors,
            [name]: '' // Clear the error message for the current input field
      
          });

        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          const errors = validateForm(formData);
      
          if (Object.keys(errors).length === 0) {
            registerUser()
          } else {
            setFormErrors(errors);
          }
        };

        const registerUser = () => {
          fetch('http://192.168.5.222:8000/signUp', {
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
          })
          .catch(error => {
            console.error('API Error:', error);
          });
        };
      
        const validateForm = (data) => {
          let errors = {};
          if (!data.first_name.trim()) {
            errors.first_name = '***First name is required***';
          }
          if (!data.second_name.trim()) {
            errors.second_name = '***Last name is required***';
          }
          if (!data.email.trim()) {
            errors.email = ' ***Email is required***';
          } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = '***Invalid email format***';
          }
          if (!data.dob) {
            errors.dob = '***Date of birth is required***';
          }
          if (!data.phone_number.trim()) {
            errors.phone_number = 'Mobile number is required';
          } else if (!/^\d{10}$/.test(data.phone_number)) {
            errors.phone_number = 'Invalid mobile number';
          }
          if (!data.password.trim()) {
            errors.password = '***Password is required***';
          }    return errors;
        };
      
    return (
    
    <div >
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

