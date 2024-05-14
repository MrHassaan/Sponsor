import React, {useState} from 'react';
import Navbar from './Navbar';
import {useNavigate} from 'react-router-dom';
import {signupvalidation} from './Validation';
import { Link } from 'react-router-dom';
function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        fname:"",email:"",password:"",usertype:""});

    const [errors, setError] = useState({});

    let name,value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

    
    const PostData = async (e) => {
        e.preventDefault();
        const validationErrors = signupvalidation(user);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const { fname, email, password, usertype } = user;
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fname, email, password, usertype })
            });
            const data = await res.json();
            if (data.error) {
                if (data.error === "User Already Registered.") {
                    setError({ signup_error: data.error });
                }
            } else {
                navigate('/login');
            }
        }
    }


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
                        <h3 class="card-title text-center mb-5">Sign Up</h3>
                        <form method="POST">
                        {errors.signup_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.signup_error}</p>}
                            <div class="mb-4">
                                <label for="fullname" class="form-label">Full Name</label>
                                <input type="text" class="form-control" name="fname" id="username" placeholder="Enter your full name" value={user.fname}
                onChange={handleInputs} />
                            </div>
                            {errors.fname && <p style={{color:"red",fontSize:"13px",}}>{errors.fname}</p>}
                            <div class="mb-4">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" id="email" placeholder="Enter your email" value={user.email}
                onChange={handleInputs} />
                            </div>
                            {errors.email && <p style={{color:"red",fontSize:"13px",}}>{errors.email}</p>}
                            <div class="mb-4">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" name="password" id="password" placeholder="Enter your password" value={user.passsword}
                onChange={handleInputs}/>
                            </div>
                            {errors.password && <p style={{color:"red",fontSize:"13px",}}>{errors.password}</p>}
                            <div class="mb-4">
                                Which of the following best describes you?  
                                <select id="usertype" name="usertype" value={user.usertype}
                onChange={handleInputs} class="form-select">
                                    <option value="" selected>Please select an option from the following</option>
                                    <option value="eventorganizer">Event Organizer</option>
                                    <option value="sponsor">Sponsor</option>
                                  </select>    
                            </div>
                            {errors.usertype && <p style={{color:"red",fontSize:"13px"}}>{errors.usertype}</p>}
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary" onClick={PostData}>Sign Up</button>
                            </div>
                        </form>
                        <div class="text-center mt-3">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
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

export default SignUp;


