import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          dispatch({ type: 'CLEAR' });
          navigate('/'); 
        } else {
          throw new Error('Logout request failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logoutUser();
  }, [dispatch, navigate]); 
};

export default Logout;
