
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {useLocation,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

function EventDetails() {
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({});
    const location = useLocation();
    const [selectedPackage, setSelectedPackage] = useState(null); 
    const [errorMessage, setErrorMessage] = useState('');
    const [eventSponsored,setEventSponsored] =  useState(false);
    const [sponsoredPackage, setSponsoredPackage] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  
  const fetchEventData = async () => {
    try {
        const response = await fetch(`/events/${id}`);
        const data = await response.json();
        if (response.ok) {
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

const fetchSponsoredEvents = async () => {
    try {
        const response = await fetch(`/checksponsoredevents/${id}`);
        const data = await response.json();
        
        if (response.ok) {
            setEventSponsored(data.sponsored);
            setSponsoredPackage(data.packageId);
             // Update state with fetched event data
        } else {
            console.error('Failed to fetch event data:', data.error);
        }
    } catch (error) {
        console.error('Error fetching event data:', error);
    }
};


    useEffect(() => {


        fetchEventData();
        fetchSponsoredEvents();
    }, [id]); // Fetch data when the component mounts or ID changes

    const handlePackageSelection = (packageIndex) => {
        setSelectedPackage(packageIndex); // Update selected package state
        if(errorMessage !== ''){
            setErrorMessage('');
        }
        
    };
    const handleSponsorButtonClick = async () => {
        if (selectedPackage === null) {
            setErrorMessage('Please select at least one package.');
        } else {
            try {
                const response = await fetch('/sponsoredevents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                           // Assuming you have the sponsor's ID in state
                        eventId: id,
                        packageId: selectedPackage,
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    navigate('/myevents');
                } else {
                    console.error('Failed to save sponsored event:', data.error);
                }
            } catch (error) {
                console.error('Error saving sponsored event:', error);
            }
        }
    };

    const handleContactOrganizerClick = () => {
        // Assuming organizerId is available in eventData
        const organizerId = eventData.organizer;
        navigate(`/chat?organizerId=${organizerId}`);
    };

    const handlePaymentClick = async () => {
        const stripe = await loadStripe('pk_test_51PAWz1LpRQPWr6S0RySFFdCK33NXaHwnXXfQr8GqUhlZYAh2W4te4JpFAcuxYAHsuhMSkPao4ZswtGCYqwrWje3H00ph3AxAkW');

        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eventData })
            });

            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    

    return (
        <div className="container-xxl p-0">
            <Navbar />
            <div className="container-fluid py-5 bg-dark">
                    <div className="row justify-content-center align-items-stretch" >
                        <div className="col-lg-8 col-md-10 col-sm-12">
                            <div className="row" style={{boxShadow:'2px 2px 4px rgba(0, 0, 0, 0.3)'}}>
                                {/* Event Image */}
                                <div className="col-lg-6 p-0">
                                    <div className="text-center p-4 bg-white">
                                        <img
                                            src={`http://localhost:5000/${eventData.eventlogo}`}
                                            className="img-fluid w-100"
                                            alt="Event"
                                        />
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="col-lg-6 p-0 ">
                                    <div className="card border-0 rounded-0 h-100">
                                        <div className="card-body">
                                            <h3 className="card-title py-2">{eventData.title}</h3>
                                            <p><strong>From:</strong> {eventData.startdate}</p>
                                            <p><strong>To:</strong> {eventData.enddate}</p>
                                            <p><strong>Category:</strong> {eventData.eventtype}</p>
                                            <p><strong>Location:</strong> {eventData.location}</p>
                                            {/* Sponsor Button state.userType*/}
                                             
                                               {state.userType !== 'event organizer' && (
        <div>
            {!eventSponsored ? (
                                            <>
                                            <button className="btn btn-primary me-3" onClick={handleSponsorButtonClick}>
                                                Sponsor
                                            </button>
                                            <button className="btn btn-success" onClick={handleContactOrganizerClick}>Contact Organizer</button>
                                            </>
                                            
                                            ) : (
                                            
                                                
                                                
                                                <>
                                                <button className="btn btn-danger me-3" disabled>
                                                Already Sponsored
                                                </button>
                                                <button className="btn btn-primary me-3" onClick={handlePaymentClick}>
                                                Pay
                                            </button>
                                                </>
                                                
                                        )}
  
          </div>
      )}
                                        
                                        </div>
                                    </div>
                                </div>

                                {/* Event Description and Packages */}
                                <div className="col-lg-8 p-0 w-100">
                                    <div className="card border-0">
                                        <div className="card-body">
                                        
                                            <div className='p-2' >
                                            <p><strong>Description</strong> </p>
                                            <p  className='p-2 rounded-2' style={{backgroundColor: '#bdbdbdbd',boxShadow:'2px 2px 4px rgba(0, 0, 0, 0.1)'}}>{eventData.eventdesc}</p>
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-lg-4 p-0  w-100">
                                <div className="card border-0 rounded-0 p-2">
                                    <div className="card-body ">
                                    {errorMessage && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {errorMessage}
                                    </div>
                                )}  
                                    <p><strong>Packages</strong></p>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: '20px' }}>
  {eventData.packages &&
    eventData.packages.map((packageItem, index) => (
        <button  key={index} disabled={state.userType === 'event organizer' || eventSponsored } className={`btn border-0 p-0 ${selectedPackage === index ? 'selected' : ''}`}
        onClick={() => handlePackageSelection(packageItem._id)} style={{backgroundColor: (selectedPackage === packageItem._id || (sponsoredPackage && sponsoredPackage === packageItem._id))? '#ffffff' : '#bdbdbdbd',boxShadow:'2px 2px 4px rgba(0, 0, 0, 0.1)'}}>
        <p className='p-2'><strong>{`Package ${index + 1}`}</strong></p>
        <p className='p-2'><strong>Amount:</strong> {packageItem.amount}</p> 
        <p className='p-2'><strong>Description:</strong> {packageItem.desc}</p>
      </button>
    ))}
</div>
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default EventDetails;
