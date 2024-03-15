import React, { useState } from 'react';
import InputField from './InputField';
import './App.css' ;

const SignupForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    city: '',
    country: '',
    address: '',
    mobileNumber: '',
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
    } else {
      setFormErrors(errors);
    }
    
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.firstName.trim()) {
      errors.firstName = '***First name is required***';
    }
    if (!data.lastName.trim()) {
      errors.lastName = '***Last name is required***';
    }
    if (!data.email.trim()) {
      errors.email = ' ***Email is required***';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = '***Invalid email format***';
    }
    if (!data.dob) {
      errors.dob = '***Date of birth is required***';
    }
    if (!data.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(data.mobileNumber)) {
      errors.mobileNumber = 'Invalid mobile number';
    }
    if (!data.password.trim()) {
      errors.password = '***Password is required***';
    }    return errors;
  };

  return (
    <div>
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={formErrors.firstName}
        />
        <InputField
          type="text"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={formErrors.lastName}
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
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          error={formErrors.mobileNumber}
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
};

export default SignupForm;
