import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {adminloginvalidation} from './Validation';
import { useDispatch } from 'react-redux';
function AdminLogin() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        email:"",password:""});
        let name,value;
        const [errors, setError] = useState({});
        const [message, setMessage] = useState("");
        const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;    
            setUser({...user, [name]:value})
        }

        const PostData = async (e) => {
            e.preventDefault();
            setError(adminloginvalidation(user));
                
                const { email, password } = user;
                
                try {
                    const res = await fetch("/adminlogin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    });
        
                    const response = await res.json();
                    if (response.error) {
                        if (response.error === "Invalid Email or Password.") {
                            setError({ login_error: response.error });
                        }
                    } else {
                        if (response.message) {
                            setMessage(response.message);
                                 dispatch({ type: "ADMIN", username: 'admin' });
                                 navigate('/admindashboard');
                            
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    
                }
            
        }

    return (
        <div class="container-xxl p-0">
        <div class="container-fluid bg-dark" style={{padding: '156px'}}>
            
            <div class="row justify-content-center align-items-center">
                <div class="col-lg-8 col-md-10 col-sm-12">
                
                    <div class="row">
                    <div class="col-lg-12 bg-primary text-center py-3 ">
                    <img className="img-fluid" src="assets/img/fav.ico" alt="Icon" style={{width: "55px", height: "50px"}}/>
                    </div>
                        <div class="col-lg-12 px-0">
                        
                            <div class="card border-0 rounded-0 h-100">
                                <div class="card-body">
                                    
                                    <h3 class="card-title text-center mb-3">Admin Login</h3>
                                    {message && <h5 class="text-center">{message}</h5>}
                                    <form method="POST">

                                    {errors.login_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.login_error}</p>}

                                        <div class="mb-4">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="email" class="form-control" name="email" id="email" placeholder="Enter your email" value={user.email} onChange={handleInputs}/>
                                            {errors.email && <p style={{color:"red",fontSize:"13px",}}>{errors.email}</p>}
            
                                        </div>
                                        <div class="mb-4">
                                            <label for="password" class="form-label">Password</label>
                                            <input type="password" class="form-control" name="password" id="password" placeholder="Enter your password" value={user.password} onChange={handleInputs}/>
                                            {errors.password && <p style={{color:"red",fontSize:"13px"}}>{errors.password}</p>}
            
                                        </div>
                                        <div class="d-grid gap-2">
                                            <button type="submit" class="btn btn-primary" onClick={PostData}>Login</button>
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
export default AdminLogin;