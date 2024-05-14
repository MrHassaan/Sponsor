import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const fetchEvents = async () => {
        try {
            let apiUrl = '/geteventsadmin';
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
      const fetchUsers = async () => {
        try {
            let apiUrl = '/getusersadmin';
            const res = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!res.ok) {
              throw new Error('Failed to fetch users');
            }
        
            const data = await res.json();
            setUsers(data);
        } catch (err) {
          console.log(err);
        }
      };
       const eventOrganizersCount = users.filter(user => user.usertype === 'eventorganizer' || user.usertype === 'Event Organizer').length;
       const sponsorsCount = users.filter(user => user.usertype === 'sponsor' || user.usertype === 'Sponsor').length;
      useEffect(() => {
        fetchEvents();
        fetchUsers();
      }, []);

    return (
        <div>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="logo-details">
                     <img className="img-fluid" src="assets/img/fav.ico" alt="Icon" style={{paddingLeft:"20px",width: "45px", height: "30px"}}/> 
                     <span className="logo_name px-4">SPONSOR CONNECT</span> 
                </div>
                <ul className="nav-links" style={{padding:"0"}}>
                    <li>
                        <Link to="/admindashboard" className="active">
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
                        <Link to="/adminevents">
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
                    
                    <div className="profile-details">
                        <span className="admin_name">Admin</span>
                        
                    </div>
                </nav>

                <div className="home-content">
                    <div className="overview-boxes">
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Events</div>
                                <div className="number">{events.length}</div>
                            </div>
                            <i className='bx bx-calendar-alt cart'></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Users</div>
                                <div className="number">{users.length}</div>
                            </div>
                            <i className='bx bxs-user cart two' ></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Event Organizers</div>
                                <div className="number">{eventOrganizersCount}</div>
                            </div>
                            <i className='bx bx-user cart three' ></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Sponsors</div>
                                <div className="number">{sponsorsCount}</div>
                            </div>
                            <i className='bx bxs-user cart four' ></i>
                        </div>
                    </div>
                    {events.length > 0 && (
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">Upcoming Events</div>
                        <div className="sales-details">
                             {/* {events.map((event, index) => (  
                                <> */}
                                
                                    <ul className="details">
                                        <li className="topic">Name</li> 
                                        {events.map((event, index) => (
                                        <li>{event.title}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Type</li> 
                                        {events.map((event, index) => (
                                        <li>{event.eventtype}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Location</li> 
                                        {events.map((event, index) => (
                                        <li>{event.location}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Start Date</li> 
                                        {events.map((event, index) => (
                                        <li>{event.startdate.split('T')[0]}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">End Date</li> 
                                        {events.map((event, index) => (
                                        <li>{event.enddate.split('T')[0]}</li>
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

export default AdminDashboard;

