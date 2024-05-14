
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
function EventDetails() {
    const state = useSelector((state) => state);
    const [eventData, setEventData] = useState({});
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/events/${id}`);
                const data = await response.json();
                if (response.ok) {
                    console.log(data[0]);
                    data[0].startdate = data[0].startdate.split('T')[0];
                    data[0].enddate = data[0].enddate.split('T')[0];
                    setEventData(data[0]); // Update state with fetched event data
                } else {
                    console.error('Failed to fetch event data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [id]); // Fetch data when the component mounts or ID changes

    return (
        <div className="container-xxl p-0">
            <Navbar />
            
        </div>
    );
}

export default EventDetails;
