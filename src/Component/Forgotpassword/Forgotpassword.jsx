import React , { useState }  from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
import CONSTANTS from '../../Constant/Constants';

export default function Forgotpassword() {

    const [signupData, setSignupData] = useState({
        email: '',
    })
    const [formErrors, setFormErrors] = useState({});

       
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({           
      ...signupData,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: '' // Clear the error message for the current input field

    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(signupData);

    if (Object.keys(errors).length === 0) {


      fetch(`${CONSTANTS.BASE_URL}/forgotPassword`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Forgotpassword Form submitted:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      }); 

    } else {
      setFormErrors(errors);
    }

  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.email.trim()) {
        errors.email = ' Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = 'Invalid email format';
      }
          return errors;
    };


  return (
 <>
<div >
<h2>FORGOT PASSWORD </h2>
      <form onSubmit={handleSubmit}>

<InputField
          type="email"
          label=" ENTER YOUR EMAIL"
          name="email"
          value={signupData.email}
          onChange={handleInputChange}
          error= {formErrors.email}
        />

        <br />
         <div>
        <button type="submit">Submit</button>
        </div>

        </form>
   
</div>
 </>
    )
}

