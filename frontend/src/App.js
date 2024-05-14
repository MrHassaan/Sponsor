// import SignUp from "./pages/SignUp";
// import EventDetails from "./pages/event-details";
// import Events from "./pages/events";
// import Home from "./pages/home";
// import Login from "./pages/login";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { createContext, useReducer } from 'react';

// import { initialState, reducer } from './reducer/UseReducer';
// import Logout from "./pages/logout";
// import CreateEvent from "./pages/create-event";

// const Routing = () =>{
//   return(
//     <>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/logout" element={<Logout/>}/>
//           <Route path="/signup" element={<SignUp/>}/>
//           <Route path="/events" element={<Events/>}/>
//           <Route path="/eventdetails" element={<EventDetails/>}/>
//           <Route path="/createevent" element={<CreateEvent/>}/>
//         </Routes>
//     </>
//   )
// }

// export const UserContext = createContext();

// function App() {
//   const [state,dispatch] = useReducer(reducer,initialState);
//   return (
//     <div className="App">
//       {/* <Router>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/signup" element={<SignUp/>}/>
//           <Route path="/events" element={<Events/>}/>
//           <Route path="/eventdetails" element={<EventDetails/>}/>
          
//         </Routes>
//       </Router> */}

//       <UserContext.Provider value={{state, dispatch}}>
//       <Router>
//       <Routing />  
//       </Router>
//       </UserContext.Provider>
//     </div>
//   );
// }

// export default App;

// App.js

// import React, { createContext, useReducer } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Routing from './Routing'; // Assuming you have a separate Routing component
// import { initialState, reducer } from './reducer/UseReducer';

// export const UserContext = createContext();

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div className="App">
//       <UserContext.Provider value={{ state, dispatch }}>
//         <Router>
//           <Routing />
//         </Router>
//       </UserContext.Provider>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing'; // Assuming you have a separate Routing component
import { Provider } from 'react-redux';
import { store } from './store'; // Import your Redux store

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routing />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
