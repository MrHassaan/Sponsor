import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

function AdminUsers() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    
    const [userName, setUserName] = useState('');
    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const fetchUsers = async () => {
        try {
            let apiUrl = '/getusersadmin';
            const params = new URLSearchParams();
            if (userName) params.append('fname', userName);
            const queryString = params.toString();
            if (queryString) apiUrl += `?${queryString}`;
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

      useEffect(() => {
        fetchUsers();
      }, [userName]);

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
                        <Link to="/adminusers" className="active">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/adminevents" >
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
                        <input type="text" placeholder="Search User" value={userName}
                  onChange={(e) => setUserName(e.target.value)} />
                        <i className='bx bx-search' ></i>
                    </div>
                    <div className="profile-details">
                        
                        <span className="admin_name">Admin</span>
                    
                    </div>
                </nav>

                <div className="home-content">
                    {users.length > 0 && (
                <div className="sales-boxes">
                    <div className="recent-sales box">
                        <div className="title">Users</div>
                        <div className="sales-details">
                                    <ul className="details">
                                        <li className="topic">Full Name</li> 
                                        {users.map((user, index) => (
                                        <li key={index}>{user.fname}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">Email</li> 
                                        {users.map((user, index) => (
                                        <li key={index}>{user.email}</li>
                                        ))} 
                                    </ul>
                                    <ul className="details">
                                        <li className="topic">User Type</li> 
                                        {users.map((user, index) => (
                                        <li key={index}>{user.usertype}</li>
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

export default AdminUsers;

