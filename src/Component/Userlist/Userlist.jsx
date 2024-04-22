import React, { useState, useEffect } from 'react';
import './Userlists.css';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../Constant/Constants';

export default function Userlist() {
    const [userData, setUserData] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const navigate = useNavigate(); // Initialize the navigate function
         console.log(userData) ;

    useEffect(() => {
        fetchUserData();
    }, []);

    
    useEffect(() => {
        const results = userData.filter(user =>
            user.first_name.toLowerCase().includes(query.toLowerCase()) ||        //this line checks if the user's first name contains the search query, regardless of the case of the letters in both the first name and the search query. If it does, the user will be included in the filtered results
            user.second_name.toLowerCase().includes(query.toLowerCase()) // ||
         
            //  user.country.toLowerCase().includes(query.toLowerCase()) ||
           // user.phone_number.includes(query)
        );
        setFilteredData(results);
    }, [query, userData]);            //new data from backend or whenever the search query changes.

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setFilteredData(userData.slice(startIndex, endIndex));
    }, [currentPage, userData,itemsPerPage]);


    const fetchUserData = async () => {
       
        try {
            let token = localStorage.getItem('token')
            const response = await fetch(`${CONSTANTS.BASE_URL}/userList`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}` ,
                   'Access-Control-Allow-Origin': '*',
                },
            
            });
            const data = await response.json();
            setUserData(data);
            setFilteredData(data.slice(0, itemsPerPage));       
        }
        
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = event => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleProfileUpdateClick = () => {
        navigate('/profileupdate'); // Navigate to the profile update page
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
       <>
            <div>
                <input type="text" value={query} onChange={handleSearch} placeholder="Search..." />
            </div>
            <br />
            
            <table border="1">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Second Name</th>
                        <th>Country</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {filteredData.map(user => (
                        <tr key={user._id}>
                            <td>{user.first_name}</td>
                            <td>{user.second_name}</td>
                            <td>{user.country}</td>
                            <td>{user.phone_number}</td>
                        </tr>
                  ))}
                  
                </tbody>
            </table>
              <br />
            <button 
            onClick={handleProfileUpdateClick}
            style={{
                padding : '10px 20px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            
           }} >
            UPDATE YOUR PROFILE</button>
            
            <br />
            <br />

            <div>
                {Array.from({ length: Math.ceil(userData.length / itemsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}





