import React  from 'react';
import { useSelector } from 'react-redux';
import { useLocation ,Link} from 'react-router-dom';

function Navbar() {

    const state = useSelector((state) => state);
    const location = useLocation(); // Get the current location using useLocation hook

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    
    if (state.userType){
        if(state.userType === "sponsor"){
            return (        
                <div className="container-fluid nav-bar bg-transparent">
                    <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
                            <div className="icon p-2 me-2">
                                <img className="img-fluid" src="assets/img/favicon.ico" alt="Icon" style={{width: "40px", height: "30px"}}/>
                            </div>
                            <h4 className="m-0 text-primary">SPONSOR CONNECT</h4>
                        </Link>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto">
                                <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>HOME</Link>
                                <Link to="/about" className={`nav-item nav-link ${isActive('/about')}`}>ABOUT</Link>
                                <div className="nav-item dropdown">
                                    <Link to="/events" className={`nav-link dropdown-toggle ${isActive('/events')}`} data-bs-toggle="dropdown">EVENTS</Link>
                                    <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/events?eventtype=Sports" className="dropdown-item">Sports</Link>
                                    <Link to="/events?eventtype=Concert" className="dropdown-item">Concert</Link>
                                    <Link to="/events?eventtype=Conference" className="dropdown-item">Conference</Link>
                                    <Link to="/events?eventtype=Trade Shows" className="dropdown-item">Trade Shows</Link>
                                    <Link to="/events?eventtype=Festivals" className="dropdown-item">Festivals</Link>
                                    <Link to="/events?eventtype=Seminar" className="dropdown-item">Seminar</Link>
                                    <Link to="/events?eventtype=Charity" className="dropdown-item">Charity</Link>
                                    <Link to="/events?eventtype=Art Exhibitions" className="dropdown-item">Art Exhibitions</Link>
                                    </div>
                                </div>
                                <Link to="/myevents" className={`nav-item nav-link ${isActive('/myevents')}`}>My Events</Link>
                                
                                <Link to="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>CONTACT</Link>
                                {/* {state.userName} */}
                            </div>
                            <div className="nav-item dropdown">
                                <Link to="about.html" className="btn btn-primary btn-block mk mb-2 mb-lg-0 dropdown-toggle" data-bs-toggle="dropdown">{state.userName}
                                </Link>
                                    <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/chat" className="dropdown-item">Chat</Link>
                                    <Link to="/editprofile" className="dropdown-item">Edit Profile</Link>
                                    <Link to="/changepassword" className="dropdown-item">Change Password</Link>
                                    <Link to="/logout" className="dropdown-item">Logout</Link>
                                    </div>
                            </div>
                        </div>
                    </nav>
                </div>        
               );
        } else if(state.userType === "event organizer"){
            return (        
                <div className="container-fluid nav-bar bg-transparent">
                    <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                        <Link to="/" className="navbar-brand d-flex align-items-center text-center">
                            <div className="icon p-2 me-2">
                                <img className="img-fluid" src="assets/img/favicon.ico" alt="Icon" style={{width: "40px", height: "30px"}}/>
                            </div>
                            <h4 className="m-0 text-primary">SPONSOR CONNECT</h4>
                        </Link>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto">
                                <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>HOME</Link>
                                <Link to="/about" className={`nav-item nav-link ${isActive('/about')}`}>ABOUT</Link>
                                <Link to="/createevent" className={`nav-item nav-link ${isActive('/createevent')}`}>CREATE EVENT</Link>
                                <Link to="/viewevents" className={`nav-item nav-link ${isActive('/viewevents')}`}>EVENTS</Link>
                                <Link to="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>CONTACT</Link>
                                <Link to="/proposal" className={`nav-item nav-link ${isActive('/proposal')}`}>PROPOSAL</Link>
                                                                
                                
                            </div>
                            <div className="nav-item dropdown">
                                <Link to="about.html" className="btn btn-primary btn-block mk mb-2 mb-lg-0 dropdown-toggle" data-bs-toggle="dropdown">{state.userName}
                                </Link>
                                    <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/eventsthatgetsponsored" className="dropdown-item">SPONSORED EVENTS</Link>
                                    <Link to="/chat" className="dropdown-item">Chat</Link>
                                    <Link to="/editprofile" className="dropdown-item">EDIT PROFILE</Link>
                                    <Link to="/changepassword" className="dropdown-item">CHANGE PASSWORD</Link>
                                    <Link to="/logout" className="dropdown-item">LOGOUT</Link>
                                    </div>
                            </div>
                        </div>
                    </nav>
                </div>        
               );
        }
    } else {
        return (        
            <div className="container-fluid nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
                    <Link to="/" className="navbar-brand d-flex align-items-center text-center">
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src="assets/img/favicon.ico" alt="Icon" style={{width: "40px", height: "30px"}}/>
                        </div>
                        <h4 className="m-0 text-primary">SPONSOR CONNECT</h4>
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>HOME</Link>
                            <Link to="/about" className={`nav-item nav-link ${isActive('/about')}`}>ABOUT</Link>
                            <div className="nav-item dropdown">
                                <Link to="/events" className={`nav-link dropdown-toggle ${isActive('/events')}`} data-bs-toggle="dropdown">EVENTS</Link>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="/events?eventtype=Sports" className="dropdown-item">Sports</Link>
                                    <Link to="/events?eventtype=Concert" className="dropdown-item">Concert</Link>
                                    <Link to="/events?eventtype=Conference" className="dropdown-item">Conference</Link>
                                    <Link to="/events?eventtype=Trade Shows" className="dropdown-item">Trade Shows</Link>
                                    <Link to="/events?eventtype=Festivals" className="dropdown-item">Festivals</Link>
                                    <Link to="/events?eventtype=Seminar" className="dropdown-item">Seminar</Link>
                                    <Link to="/events?eventtype=Charity" className="dropdown-item">Charity</Link>
                                    <Link to="/events?eventtype=Art Exhibitions" className="dropdown-item">Art Exhibitions</Link>
                                </div>
                            </div>
                            <Link to="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>CONTACT</Link>
                            <Link to="/signup" className={`nav-item nav-link ${isActive('/signup')}`}>SIGN UP</Link>
                        </div>
                        <Link to="/login" className="btn btn-primary btn-block mb-2 mb-lg-0">LOGIN</Link>
                    </div>
                </nav>
            </div>        
           ); 
    }
}

export default Navbar;
