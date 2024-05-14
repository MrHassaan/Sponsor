import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import {loginvalidation} from './Validation';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
function Login() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        email:"",password:""});
        let name,value;
        const [errors, setError] = useState({});

        const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;    
            setUser({...user, [name]:value})
        }
        const PostData = async (e) =>{
            e.preventDefault();
            setError(loginvalidation(user));
            
            const {email,password} = user;
            const res = await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email,password
                })
            });
            const data = await res.json();
            if(data.error){
              if(data.error === "Invalid Email or Password."){
                setError({login_error:data.error});
              }
            } else {
                if (data.user.usertype === 'sponsor'){
                    dispatch({type:"SPONSOR",userId:data.user._id,username:data.user.fname});
                    navigate('/'); 
                } else{
                    dispatch({type:"EVENT ORGANIZER",userId:data.user._id,username:data.user.fname});
                    navigate('/'); 
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
                                    <h3 class="card-title text-center mb-5">Login</h3>
                                    <form method="POST">

                                    {errors.login_error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.login_error}</p>}

                                        <div class="mb-4">
                                            <label for="email" class="form-label">Email</label>
                                            <input type="text" class="form-control" name="email" id="email" placeholder="Enter your email" value={user.email} onChange={handleInputs}/>
                                        </div>
                                        {errors.email && <p style={{color:"red",fontSize:"13px",}}>{errors.email}</p>}
                                        <div class="mb-4">
                                            <label for="password" class="form-label">Password</label>
                                            <input type="password" class="form-control" name="password" id="password" placeholder="Enter your password" value={user.password} onChange={handleInputs}/>
                                        </div>
                                        {errors.password && <p style={{color:"red",fontSize:"13px"}}>{errors.password}</p>}
                                        <div class="d-grid gap-2">
                                            <button type="submit" class="btn btn-primary" onClick={PostData}>Login</button>
                                        </div>
                                    </form>
                                    <div class="text-center mt-3">
                                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
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

export default Login;
