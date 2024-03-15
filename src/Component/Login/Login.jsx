import React , { useState }  from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
import { Link } from 'react-router-dom';
const backendIP = import.meta.env.VITE_BACKEND_IP;
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

   
  const [signupData, setSignupData] = useState({
        email: '' ,
        password: ''
    })

    const [formErrors, setFormErrors] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({           
      ...signupData,
      [name]: value
    });
        // Clear validation error for the input field when user starts typing

    setFormErrors({
      ...formErrors,
      [name]: '' // Clear the error message for the current input field

    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateForm(signupData);
    if (Object.keys(errors).length === 0) {
     
     //yaha se 

      fetch(`http://192.168.193.63:8000/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      .then(async response => {
        const result = await response.json()
        console.log(result.token)

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        localStorage.setItem('token', result.token);
       
       // return response.json();
      })
      .then(data => {
        console.log('LoginForm submitted:', data);
           
          navigate('userdata')
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });  
      //yaha tak    
    } else {
      setFormErrors(errors);
    }

  };


  const validateForm = (data) => {
    let errors = {};
    if (!data.email.trim()) {
        errors.email = ' ***Email is required***';
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = '***Invalid email format***';
      }
      if (!data.password.trim()) {
        errors.password = '***Password is required***';
      }    return errors;
    };

 return(

<>
       <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}  >

<InputField
          type="email"
          label="Email"
          name="email"
          value={signupData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          autoComplete={'off'}
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          value={signupData.password}
          onChange={handleInputChange}
          error={formErrors.password}
        />
        <br />
      
        <Link  to="forgotpassword">
        <div><p>Forgot Password?</p></div>
                        </Link>

        <div>
        <button type="submit">Submit</button>
        </div> <br />
      
        <Link  to="signup">
        <div>SIGNUP NOW </div>
                        </Link>

</form>
</>
    );
};
