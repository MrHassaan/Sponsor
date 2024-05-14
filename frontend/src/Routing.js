// Routing.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import CreateEvent from './pages/create-event';
import ViewEvents from './pages/ViewEvents'
import EditEvent from './pages/edit-event'
import { useSelector } from 'react-redux';
import Logout from './pages/logout';
import EventDetails from './pages/event-details';
import Events from './pages/Events';
import Proposal from './pages/proposal';
import CreateProposal from './pages/create-proposal';
import EditProposal from './pages/edit-proposal';
import EditProfile from './pages/edit-profile';
import ChangePassword from './pages/change-password';
import About from './pages/about';
import Contact from './pages/contact';
import AdminLogin from './pages/adminlogin';
import AdminLogout from './pages/adminlogout';
import AdminDashboard from './pages/admin-dashboard';
import AdminEvents from './pages/admin-events';
import AdminUsers from './pages/admin-users';
import MyEvents from './pages/my-events';
import SponsoredEvents from './pages/sponsored-events'
import Chat from './pages/chat';


const Routing = () => {
  const userstate = useSelector((userstate) => userstate);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/adminlogin"
        element= {userstate.userType === 'admin'? <Navigate to="/admindashboard" replace /> : <AdminLogin />}
      />
      <Route
        path="/adminlogout"
        element= {userstate.userType === 'admin'? <AdminLogout />: <Navigate to="/adminlogin" replace />}
      />
      <Route
        path="/adminevents"
        element= {userstate.userType === 'admin'? <AdminEvents />: <Navigate to="/adminlogin" replace />}
      />
      <Route
        path="/adminusers"
        element= {userstate.userType === 'admin'? <AdminUsers />: <Navigate to="/adminlogin" replace />}
      />
      <Route
        path="/admindashboard"
        element= {userstate.userType === 'admin'? <AdminDashboard />: <Navigate to="/adminlogin" replace />}
      />
      <Route
        path="/login"
        element={userstate.userType ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/logout"
        element={!userstate.userType ? <Navigate to="/" replace /> : <Logout />}
      />
      <Route
        path="/signup"
        element={!userstate.userType ?  <SignUp /> : <Navigate to="/" replace />}
      />
      <Route
        path="/createevent"
        element={userstate.userType === 'event organizer' ? <CreateEvent />:<Navigate to="/" replace />  }
      />
      <Route
        path="/viewevents"
        element={userstate.userType === 'event organizer' ? <ViewEvents />:<Navigate to="/" replace />  }
      />
      <Route
        path="/editevent"
        element={userstate.userType === 'event organizer' ? <EditEvent />:<Navigate to="/" replace />  }
      />
      <Route
        path="/eventdetails"
        element={userstate.userType !== null ? <EventDetails />:<Navigate to="/login" replace />  }
      />
      <Route
        path="/events"
        element= {<Events />}
      />
      <Route
        path="/proposal"
        element={userstate.userType === 'event organizer' ? <Proposal />:<Navigate to="/" replace />  }
      />
      <Route
        path="/createproposal"
        element={userstate.userType === 'event organizer' ? <CreateProposal />:<Navigate to="/" replace />  }
      />
      <Route
        path="/viewproposal"
        element={userstate.userType === 'event organizer' ? <EditProposal />:<Navigate to="/" replace />  }
      />
      <Route
        path="/editprofile"
        element={userstate.userType !== null ? <EditProfile />:<Navigate to="/" replace />  }
      />
      <Route
        path="/changepassword"
        element={userstate.userType !== null ? <ChangePassword />:<Navigate to="/" replace />  }
      />
      
      <Route
        path="/myevents"
        element={userstate.userType === 'sponsor' ? <MyEvents />:<Navigate to="/" replace />  }
      />
      <Route
        path="/eventsthatgetsponsored"
        element={userstate.userType === 'event organizer' ? <SponsoredEvents />:<Navigate to="/" replace />  }
      />
      <Route
        path="/chat"
        element= {<Chat />}
      />
      {/* Add other routes */}
    </Routes>
  );
};

export default Routing;