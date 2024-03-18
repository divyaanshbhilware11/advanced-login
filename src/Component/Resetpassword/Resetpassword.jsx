
import React , { useState }  from 'react'
import InputField from '../../InputField';
import '../../App.css' ;
import { useParams } from 'react-router-dom'; 
import CONSTANTS from '../../Constant/Constants';


export default function Resetpassword() {
  
   const {id} = useParams();

    const [signupData, setSignupData] = useState({
        password: '',
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
     
          fetch(`${CONSTANTS.BASE_URL}/reset/${id}`, { 
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
            console.log('ResetPassword Form submitted:', data);
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
        if (!data.password.trim()) {
            errors.password = 'Password is required';
          }    return errors;
        };
       
    return (
    <>
    <div>
    <h2>RESET PASSWORD </h2>
      <form onSubmit={handleSubmit}>

      <InputField
          type="password"
          label="ENTER NEW PASSWORD"
          name="password"
          value={signupData.password}
          onChange={handleInputChange}
          error={formErrors.password}
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

