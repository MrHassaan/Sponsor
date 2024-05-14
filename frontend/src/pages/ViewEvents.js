
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [eventTitle, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setDate] = useState('');
  
  const fetchEvents = async () => {
    try {
      let apiUrl = '/getevents';

      
      const params = new URLSearchParams();
      if (eventType) params.append('eventtype', eventType);
      if (eventLocation) params.append('location', eventLocation);
      if (eventTitle) params.append('title', eventTitle);
      if (eventDate) params.append('startdate', eventDate);

      const queryString = params.toString();
      if (queryString) apiUrl += `?${queryString}`;


      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
  
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };
 
  const handleDelete = async (eventId) => {
    try {
      const res = await fetch(`/deleteevent/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // If the delete operation was successful, update the events in the state
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        setDeleteMessage('Event Deleted Successfully.');
      } else {
        const data = await res.json();
        setDeleteMessage(data.error || 'Error deleting event');
      }
    } catch (error) {
      setDeleteMessage('Error deleting event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventType, eventLocation, eventTitle,eventDate]);


  return (
    <div className="container-xxl p-0">
      <Navbar />
      <div className="container-xxl py-5 bg-primary bg-gradient">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col">
              <div className="text-center mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                <h1 className="mb-3 text-white">Events</h1>
                {deleteMessage && <h4 className='text-primary'>{deleteMessage}</h4>}
              </div>
              <div className="container-fluid bg-dark wow fadeIn mb-5 rounded-2 " style={{padding:'12px'}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-12">
                        <div className="row g-2">
                            <div className=" col-md-3">
                                <input type="text"  className="form-control border-0 py-3 w-100" placeholder="Search Event"  value={eventTitle}
                  onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className=" col-md-3">
                                <select className="form-select border-0 py-3" value={eventType}
                  onChange={(e) => setEventType(e.target.value)}>
                                <option value="">Select Event Type</option>
        <option value="Sports">Sports</option>
        <option value="Concert">Concert</option>
        <option value="Conference">Conference</option>
        <option value="Trade Shows">Trade Shows</option>
        <option value="Festivals">Festivals</option>
        <option value="Seminar">Seminar</option>
        <option value="Charity">Charity</option>
        <option value="Art Exhibitions">Art Exhibitions</option>
                                </select>
                            </div>
                            <div className=" col-md-3">
                                <select className="form-select border-0 py-3"  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}>
                                    <option value="">City</option>
                                    <option value="Lahore">Lahore</option>
<option value="Karachi">Karachi</option>
<option value="Islamabad">Islamabad</option>
<option value="Faisalabad">Faisalabad</option>
<option value="Rawalpindi">Rawalpindi</option>
<option value="Multan">Multan</option>
<option value="Gujranwala">Gujranwala</option>
<option value="Quetta">Quetta</option>
<option value="Peshawar">Peshawar</option>
<option value="Sialkot">Sialkot</option>
                                </select>
                            </div>
                            <div className=" col-md-3">
                                <input type="date"  className="form-control border-0 py-3 w-100" placeholder="Search Event"  value={eventDate}
                  onChange={(e) => setDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
            </div>
          </div>
          <div className="tab-content">
            <div id="tab-1" className="tab-pane p-0 active">
             {events.length > 0 ? (
              <div className="row g-4">
                {events.map((event) => (
                  <div key={event._id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="Event-item rounded overflow-hidden bg-dark ">
                                    <div class="position-relative overflow-hidden">
                                        <Link to={`/eventdetails?id=${event._id}`}><img className="img-fluid w-100" src={`http://localhost:5000/${event.eventlogo}`} alt="" /></Link>
                                                    <Link to={`/editevent?id=${event._id}`} className="bg-primary rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3">EDIT</Link>
                                    </div>
                                    <div class="p-4 pb-0 position-relative">
            <button type="button" class="btn btn-light position-absolute end-0 top-0 m-4 py-1 px-3" onClick={() => handleDelete(event._id)}>DELETE</button>

    <h5 class="text-primary mb-3">{event.eventtype}</h5>
    <Link className="d-block h5 mb-2 text-white" to={`/eventdetails?id=${event._id}`}>{event.title}</Link>
    <p className="text-primary"><i className="fa fa-map-marker-alt text-primary me-2"></i>{event.location}</p>
</div>
                                    
                    </div>
                  </div>
                ))}
              </div>
               ) : (
                 <div className="col-12 d-flex align-items-center justify-content-center" style={{height:'40vh'}}>
                    <div className="text-center">
                      <h3>No events found</h3>
                      {/* Additional message or actions */}
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEvents;
