import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

function AdminEvents() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [eventTitle, setTitle] = useState('');
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
    const fetchEvents = async () => {
        try {
            let apiUrl = '/geteventsadmin';
            const params = new URLSearchParams();
            if (eventTitle) params.append('title', eventTitle);
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

      useEffect(() => {
        fetchEvents();
      }, [eventTitle]);

    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="logo-details">
                     <img className="img-fluid" src="assets/img/fav.ico" alt="Icon" style={{paddingLeft:"20px",width: "45px", height: "30px"}}/> 
                     <span className="logo_name px-4">SPONSOR CONNECT</span> 
                </div>
                <ul className="nav-links" style={{padding:"0"}}>
                    <li>
                        <Link to="/admindashboard" >
                            <i className='bx bx-grid-alt' ></i>
                            <span className="links_name">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/adminusers">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminevents" className="active">
                            <i className='bx bx-calendar' ></i>
                            <span className="links_name">Events</span>
                        </Link>
                    </li>
                    <li className="log_out mb-5">
                        <Link to="/adminlogout">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <section className="home-section">
                <nav>
                    <div className="sidebar-button">
                    <i className={`bx ${isSidebarOpen ? 'bx-menu-alt-right' : 'bx-menu'} sidebarBtn`} onClick={toggleSidebar}></i>
                        <span className="dashboard">Dashboard</span>
                    </div>
                    <div className="search-box">
                        <input type="text" placeholder="Search Event" value={eventTitle}
                  onChange={(e) => setTitle(e.target.value)} />
                        <i className='bx bx-search' ></i>
                    </div>
                    <div className="profile-details">
                        
                        <span className="admin_name">Admin</span>
                    </div>
                </nav>

                <div className="home-content">
                    {events.length > 0 && (
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">Events</div>
                        {deleteMessage && <p className='text-center text-dark'>{deleteMessage}</p>}
                        <div className="sales-details">
                                
                                    <ul className="details">
                                        <li className="topic">Name</li> 
                                        {events.map((event, index) => (
                                        <li key={index}>{event.title}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Type</li> 
                                        {events.map((event, index) => (
                                        <li key={index}>{event.eventtype}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Location</li> 
                                        {events.map((event, index) => (
                                        <li key={index}>{event.location}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Start Date</li> 
                                        {events.map((event, index) => (
                                        <li key={index}>{event.startdate.split('T')[0]}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">End Date</li> 
                                        {events.map((event, index) => (
                                        <li key={index}>{event.enddate.split('T')[0]}</li>
                                        ))} 
                                    </ul> 
                                    <ul className="details"> 
                                    <li className="topic">Option</li>
                                        {events.map((event, index) => (
                                        <li className='text-center' key={index}><i className='bx bx-trash text-danger' style={{fontSize:"22px",cursor: "pointer"}} onClick={() => handleDelete(event._id)}></i></li>
                                        ))} 
                                    </ul>                            
                        </div>
                    </div>
                </div>
            )}
                </div>
            </section>
        </div>
    );
}

export default AdminEvents;

