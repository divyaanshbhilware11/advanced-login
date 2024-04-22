import React , { useState }  from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../Constant/Constants';
import { setLoginData, setToken, setError, clearError, selectEmail, selectPassword, selectError } from '../SLICE/LoginSlice'; 


export default function Login() { 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(selectEmail);     //retrieve data from redux store
  const password = useSelector(selectPassword);
  const error = useSelector(selectError);

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Clear previous errors
    setFormErrors({});
  
    // Clear Redux store error
    dispatch(clearError());
  
    // Update state based on input field
    if (name === 'email') {
      dispatch(setLoginData({ email: value, password }));
    } else if (name === 'password') {
      dispatch(setLoginData({ email, password: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormErrors({ email: !email ? 'Email is required' : '', password: !password ? 'Password is required' : '' });
      return;
    }

    try {
      const response = await fetch(`${CONSTANTS.BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
    
      localStorage.setItem('token', result.token);
    
      dispatch(setToken(result.token)); // Dispatching the token to update the store
    
      navigate('userdata');
    
    } catch (error) {
     
       dispatch(setError('There was a problem with the login operation'));
      
       console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          error={formErrors.email || error}
          autoComplete="off"
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          error={formErrors.password}
        />
        <br />

        <div>
          <button type="submit">Submit</button>
        </div>
        <br />

        <Link to="forgotpassword">
          <div>
            <p>Forgot Password?</p>
          </div>
        </Link>

        <div>
          <Link to="signup">
            <div>SIGNUP NOW</div>
          </Link>
        </div>
      </form>
    </>
  );
}