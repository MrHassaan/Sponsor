import React, {useState,useEffect} from 'react';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';
import {uservalidation} from './Validation';
import { useDispatch } from 'react-redux';
function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        fname:"",email:""});

    const [errors, setError] = useState({});
    const [updateMessage,setUpdateMessage] = useState("")
    let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

    
    const fetchUser = async () => {
        try {
            const response = await fetch('/getuserdata');
            const data = await response.json();
            if (response.ok) {

                const { fname, email } = data;
                setUser({ fname, email }); // Update state with fetched event data
            } else {
                console.error('Failed to fetch event data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };

    const PostData = async (e) => {
        e.preventDefault();
        const validationErrors = uservalidation(user);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const { fname, email} = user;
            const res = await fetch("/editprofile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email})
            });
            const data = await res.json();
            if (data.error) {
                    setError({ signup_error: data.error });
            } else {
                if(data.message === "Profile updated successfully"){
                    setUpdateMessage(data.message);
                    if (data.updatedUser.usertype === 'sponsor'){
                        dispatch({type:"SPONSOR",username:data.updatedUser.fname}); 
                    } else{
                        dispatch({type:"EVENT ORGANIZER",username:data.updatedUser.fname});
                    } 
                }
            }
        }
    };

    useEffect(() => {
        fetchUser();
      }, []);

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
                        <h3 class="card-title text-center mb-5">Your Profile</h3>
                        {updateMessage && <h5 class="text-center">{updateMessage}</h5>}
                        <form method="POST">
                        {errors.signup_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.signup_error}</p>}
                            <div class="mb-4">
                                <label for="fullname" class="form-label">Full Name</label>
                                <input type="text" class="form-control" name="fname" id="username" placeholder="Enter your full name" value={user.fname}
                onChange={handleInputs} />
                {errors.fname && <p style={{color:"red",fontSize:"13px",}}>{errors.fname}</p>}
                            </div>
                            
                            <div class="mb-4">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" id="email" placeholder="Enter your email" value={user.email}
                onChange={handleInputs} />
                            {errors.email && <p style={{color:"red",fontSize:"13px",}}>{errors.email}</p>}
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary" onClick={PostData}>SAVE</button>
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

export default EditProfile;


