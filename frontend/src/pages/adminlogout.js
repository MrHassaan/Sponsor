import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('/adminlogout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          dispatch({ type: 'CLEAR' });
          navigate('/adminlogin'); 
        } else {
          throw new Error('Logout request failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Handle logout error here (e.g., show an error message)
      }
    };

    logoutUser();
  }, [dispatch, navigate]); // Add dispatch and navigate to dependency array

};

export default AdminLogout;