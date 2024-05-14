import React, {useState,useEffect} from 'react';
import Navbar from './Navbar';
import {useNavigate,useLocation} from 'react-router-dom';
import {editeventvalidation} from './Validation';
function EditEvent() {
    const navigate = useNavigate();
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
    const [eventData, setEventData] = useState({
        title: "",
        eventdesc: "",
        eventtype: "",
        location: "",
        startdate: "",
        enddate: "",
        eventlogo: null, 
        numPackages: 0, // Default number of packages
        packages: [{ amount: "", desc: "" }], // Initial package details
      });
      const [errors, setError] = useState({});
    // const [numPackages, setNumPackages] = useState(0);
     
    const handlePackageChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPackages = [...eventData.packages];
        updatedPackages[index][name] = value;
        setEventData({ ...eventData, packages: updatedPackages });
    };

    const handleNumPackagesChange = (e) => {
        const num = parseInt(e.target.value);
        const updatedPackages = Array.from({ length: num }, (_, i) => ({
            amount: "",
            desc: "",
        }));
        setEventData({ ...eventData, numPackages: num, packages: updatedPackages });
    };
  
    const renderPackageInputs = () => {
        if (eventData.numPackages !== 0) {return eventData.packages.map((packageData, index) => (
            <div key={index} className="mb-4">
                <label htmlFor={`package${index + 1}`} className="form-label">Package {index + 1}</label>
                <input
                    type="number"
                    className="form-control"
                    name={`amount`}
                    id={`amount`}
                    value={packageData.amount}
                    onChange={(e) => handlePackageChange(e, index)}
                    placeholder="Enter amount"
                />
{errors.packages && errors.packages[index]?.amount && (
                    <p style={{ color: "red", fontSize: "13px" }}>{errors.packages[index].amount}</p>
                )}

                <div className="mt-2">
                    <textarea
                        className="form-control"
                        name={`desc`}
                        id={`desc`}
                        value={packageData.desc}
                        onChange={(e) => handlePackageChange(e, index)}
                        placeholder="Enter description"
                    />
                 {errors.packages && errors.packages[index]?.desc && (
                        <p style={{ color: "red", fontSize: "13px" }}>{errors.packages[index].desc}</p>
                    )}
                </div>
                
            </div>
        ));}
    };
    
    useEffect(() => {
        const fetchEventDetails = async () => {
          try {
            const response = await fetch(`/events/${id}`); // Adjust the API endpoint
            const data = await response.json();
            // console.log(...data);
            if (response.ok) {
                // const eventData = data[0];
                data[0].startdate = data[0].startdate.split('T')[0];
                data[0].enddate = data[0].enddate.split('T')[0];
          setEventData(data[0]);
          eventData.eventlogo = data[0].eventlogo;
        //   console.log(eventData);
            } else {
              console.error('Failed to fetch event details:', data.error);
            }
          } catch (error) {
            console.error('Error fetching event details:', error);
          }
        };
        fetchEventDetails();
      },[id]);
      
    const handleInputs = (e) => {
        const { name, value, files } = e.target;

    if (name === 'eventlogo') {
        setEventData((prevData) => ({
            ...prevData,
            eventlogo: files.length > 0 ? files[0] : null // Store file object or null
        }));
    } else {
        setEventData({ ...eventData, [name]: value });
    }
      };
    

    const PostData = async (e) => {

        e.preventDefault();
        const validationErrors = editeventvalidation(eventData);
        setError(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
              const { title,eventdesc, eventtype, location, eventlogo  ,startdate, enddate,numPackages,packages} = eventData;
              const formData = new FormData();
              formData.append('title', title);
              formData.append('eventdesc',eventdesc);
              formData.append('eventtype', eventtype);
              formData.append('location', location);
              formData.append('eventlogo', eventlogo);
              formData.append('startdate', startdate);
              formData.append('enddate', enddate);
              formData.append('numPackages', numPackages);
              formData.append('packages', JSON.stringify(packages));
        
              const res = await fetch(`/editevent/${id}`, {
                method: "PUT",
                body: formData,
              });
          
              const data = await res.json();
              
              if (!data.error) {
                navigate('/viewevents');
              }            
    }

    };
    return (
        <div class="container-xxl p-0">
                     <Navbar/>
                     <div class="container-fluid py-5 bg-light">
<div class="row justify-content-center align-items-stretch">
    <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row">
            <div class="col-lg-12 px-0">
                <div class="card border-0 rounded-0 h-100">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-5">Event Details</h3>
                        <form method="POST"  encType="multipart/form-data">
                        {/* {errors.CreateEvent_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.CreateEvent_error}</p>} */}
                            <div class="mb-4">
                                <label htmlFor="title" class="form-label">Event Name</label>
                                <input type="text" class="form-control" name="title" id="title" placeholder="Enter event name" value={eventData.title}
onChange={handleInputs}/>
                {errors.title && <p style={{ color: "red", fontSize: "13px" }}>{errors.title}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label htmlFor="eventdesc" class="form-label">Event Description</label>
                                <textarea  class="form-control" name="eventdesc" id="eventdesc" value={eventData.eventdesc}
                                onChange={handleInputs}/>
                {errors.eventdesc && <p style={{ color: "red", fontSize: "13px" }}>{errors.eventdesc}</p>}
                            </div>
                            
                            <div class="mb-4">
                                Which of the following best describes the event?  
                                <select id="eventtype" name="eventtype"  class="form-select" value={eventData.eventtype}
                onChange={handleInputs}>
                                    <option value="" selected>Please select an option from the following</option>
                                    <option value="sports">Sports</option>
                                    <option value="concert">Concert</option>
                                    <option value="conference">Conference</option>
                                    <option value="trade shows">Trade Shows</option>
                                    <option value="festivals">Festivals</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="charity">Charity</option>
                                    <option value="art exhibitions">Art Exhibitions</option>
                                </select>    
                                {errors.eventtype && <p style={{color:"red",fontSize:"13px"}}>{errors.eventtype}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label htmlFor="location" class="form-label">Location</label>
                                <input type="text" class="form-control" name="location" id="location" placeholder="Enter your location" value={eventData.location}
                onChange={handleInputs} />
                            {errors.location && <p style={{color:"red",fontSize:"13px",}}>{errors.location}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label htmlFor="eventlogo" class="form-label">Logo</label>
                                <input type="file" class="form-control" name="eventlogo" id="eventlogo"  
                onChange={handleInputs}/>
                            {errors.eventlogo && <p style={{color:"red",fontSize:"13px",}}>{errors.eventlogo}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label htmlFor="startdate" class="form-label">Start Date</label>
                                <input type="date" class="form-control" name="startdate" id="startdate" value={eventData.startdate}
                onChange={handleInputs}/>
                           {errors.startdate && <p style={{color:"red",fontSize:"13px",}}>{errors.startdate}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label htmlFor="enddate" class="form-label">End Date</label>
                                <input type="date" class="form-control" name="enddate" id="enddate" value={eventData.enddate}
                 onChange={handleInputs}/>
                {errors.enddate && <p style={{color:"red",fontSize:"13px",}}>{errors.enddate}</p>}
                            </div>
                            
                            
                            <div class="mb-4">
                            <label htmlFor="numPackages" className="form-label">Select number of Packages</label>
                            <select id="numPackages" name="numPackages" className="form-select" value={eventData.numPackages} onChange={handleNumPackagesChange}>
                            <option value={0} selected>Please select an option from the following</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                        {errors.numPackages && <p style={{color:"red",fontSize:"13px",}}>{errors.numPackages}</p>}
                            </div>
                            
                            {renderPackageInputs()}
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary" onClick={PostData}>Save</button>
                            </div>
                        </form>
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

export default EditEvent;


// import React, {useState} from 'react';
// import Navbar from './Navbar';
// import {useNavigate} from 'react-router-dom';
// import {createeventvalidation} from './Validation';
// function EditEvent() {
//     const navigate = useNavigate();
//     const [eventData, setEventData] = useState({
//         title: "",
//         eventdesc: "",
//         eventtype: "",
//         location: "",
//         startdate: "",
//         enddate: "",
//         eventlogo: null, 
//         numPackages: 0, // Default number of packages
//         packages: [{ amount: "", desc: "" }], // Initial package details
//       });
//       const [errors, setError] = useState({});
//     // const [numPackages, setNumPackages] = useState(0);

//     const handlePackageChange = (e, index) => {
//         const { name, value } = e.target;
//         const updatedPackages = [...eventData.packages];
//         updatedPackages[index][name] = value;
//         setEventData({ ...eventData, packages: updatedPackages });
//     };

//     const handleNumPackagesChange = (e) => {
//         const num = parseInt(e.target.value);
//         const updatedPackages = Array.from({ length: num }, (_, i) => ({
//             amount: "",
//             desc: "",
//         }));
//         setEventData({ ...eventData, numPackages: num, packages: updatedPackages });
//     };
  
//     const renderPackageInputs = () => {
//         if (eventData.numPackages !== 0) {return eventData.packages.map((packageData, index) => (
//             <div key={index} className="mb-4">
//                 <label htmlFor={`package${index + 1}`} className="form-label">Package {index + 1}</label>
//                 <input
//                     type="number"
//                     className="form-control"
//                     name={`amount`}
//                     id={`amount`}
//                     value={packageData.amount}
//                     onChange={(e) => handlePackageChange(e, index)}
//                     placeholder="Enter amount"
//                 />
// {errors.packages && errors.packages[index]?.amount && (
//                     <p style={{ color: "red", fontSize: "13px" }}>{errors.packages[index].amount}</p>
//                 )}

//                 <div className="mt-2">
//                     <textarea
//                         className="form-control"
//                         name={`desc`}
//                         id={`desc`}
//                         value={packageData.desc}
//                         onChange={(e) => handlePackageChange(e, index)}
//                         placeholder="Enter description"
//                     />
//                  {errors.packages && errors.packages[index]?.desc && (
//                         <p style={{ color: "red", fontSize: "13px" }}>{errors.packages[index].desc}</p>
//                     )}
//                 </div>
                
//             </div>
//         ));}
//     };
    
//     const handleInputs = (e) => {
//         const { name, value, files } = e.target;

//     if (name === 'eventlogo') {
//         setEventData((prevData) => ({
//             ...prevData,
//             eventlogo: files.length > 0 ? files[0] : null // Store file object or null
//         }));
//     } else {
//         setEventData({ ...eventData, [name]: value });
//     }
//       };
    

//     const PostData = async (e) => {

//         e.preventDefault();
//         const validationErrors = createeventvalidation(eventData);
//         setError(validationErrors);
    
//         if (Object.keys(validationErrors).length === 0) {
//               const { title,eventdesc, eventtype, location, eventlogo  ,startdate, enddate,numPackages,packages} = eventData;
//               const formData = new FormData();
//               formData.append('title', title);
//               formData.append('eventdesc',eventdesc);
//               formData.append('eventtype', eventtype);
//               formData.append('location', location);
//               formData.append('eventlogo', eventlogo);
//               formData.append('startdate', startdate);
//               formData.append('enddate', enddate);
//               formData.append('numPackages', numPackages);
//               formData.append('packages', JSON.stringify(packages));
        
//               const res = await fetch("/createevent", {
//                 method: "POST",
//                 body: formData,
//               });
          
//               const data = await res.json();
              
//               if (!data.error) {
//                 navigate('/viewevents');
//               }            
//     }

//     };
//     return (
//         <div class="container-xxl p-0">
//                      <Navbar/>
//                      <div class="container-fluid py-5 bg-light">
// <div class="row justify-content-center align-items-stretch">
//     <div class="col-lg-8 col-md-10 col-sm-12">
//         <div class="row">
//             <div class="col-lg-12 px-0">
//                 <div class="card border-0 rounded-0 h-100">
//                     <div class="card-body">
//                         <h3 class="card-title text-center mb-5">Event Details</h3>
//                         <form method="POST"  encType="multipart/form-data">
//                         {/* {errors.CreateEvent_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.CreateEvent_error}</p>} */}
//                             <div class="mb-4">
//                                 <label htmlFor="title" class="form-label">Event Name</label>
//                                 <input type="text" class="form-control" name="title" id="title" placeholder="Enter event name" value={eventData.title}
//                 onChange={handleInputs} />
//                 {errors.title && <p style={{ color: "red", fontSize: "13px" }}>{errors.title}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 <label htmlFor="eventdesc" class="form-label">Event Description</label>
//                                 <textarea  class="form-control" name="eventdesc" id="eventdesc" value={eventData.eventdesc}
//                 onChange={handleInputs}/>
//                 {errors.eventdesc && <p style={{ color: "red", fontSize: "13px" }}>{errors.eventdesc}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 Which of the following best describes the event?  
//                                 <select id="eventtype" name="eventtype"  class="form-select" value={eventData.eventtype}
//                 onChange={handleInputs}>
//                                     <option value="" selected>Please select an option from the following</option>
//                                     <option value="sports">Sports</option>
//                                     <option value="concert">Concert</option>
//                                     <option value="conference">Conference</option>
//                                     <option value="trade shows">Trade Shows</option>
//                                     <option value="festivals">Festivals</option>
//                                     <option value="seminar">Seminar</option>
//                                     <option value="charity">Charity</option>
//                                     <option value="art exhibitions">Art Exhibitions</option>
//                                 </select>    
//                                 {errors.eventtype && <p style={{color:"red",fontSize:"13px"}}>{errors.eventtype}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 <label htmlFor="location" class="form-label">Location</label>
//                                 <input type="text" class="form-control" name="location" id="location" placeholder="Enter your location" value={eventData.location}
//                 onChange={handleInputs} />
//                             {errors.location && <p style={{color:"red",fontSize:"13px",}}>{errors.location}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 <label htmlFor="eventlogo" class="form-label">Logo</label>
//                                 <input type="file" class="form-control" name="eventlogo" id="eventlogo"  
//                 onChange={handleInputs}/>
//                             {errors.eventlogo && <p style={{color:"red",fontSize:"13px",}}>{errors.eventlogo}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 <label htmlFor="startdate" class="form-label">Start Date</label>
//                                 <input type="date" class="form-control" name="startdate" id="startdate" value={eventData.startdate}
//                 onChange={handleInputs}/>
//                            {errors.startdate && <p style={{color:"red",fontSize:"13px",}}>{errors.startdate}</p>}
//                             </div>
                            
//                             <div class="mb-4">
//                                 <label htmlFor="enddate" class="form-label">End Date</label>
//                                 <input type="date" class="form-control" name="enddate" id="enddate" value={eventData.enddate}
//                 onChange={handleInputs} />
//                 {errors.enddate && <p style={{color:"red",fontSize:"13px",}}>{errors.enddate}</p>}
//                             </div>
                            
                            
//                             <div class="mb-4">
//                             <label htmlFor="numPackages" className="form-label">Select number of Packages</label>
//                             <select id="numPackages" name="numPackages" className="form-select" value={eventData.numPackages} onChange={handleNumPackagesChange}>
//                             <option value={0} selected>Please select an option from the following</option>
//                           <option value={1}>1</option>
//                           <option value={2}>2</option>
//                           <option value={3}>3</option>
//                         </select>
//                         {errors.numPackages && <p style={{color:"red",fontSize:"13px",}}>{errors.numPackages}</p>}
//                             </div>
                            
//                             {renderPackageInputs()}
//                             <div class="d-grid gap-2">
//                                 <button type="submit" class="btn btn-primary" onClick={PostData}>Save</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>        
//         </div>
        
//        );
// }

// export default EditEvent;


