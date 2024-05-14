import React, {useState} from 'react';
import Navbar from './Navbar';

import {passwordvalidation} from './Validation';
function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setError] = useState({});
    const [updateMessage,setUpdateMessage] = useState("")
    
    const PostData = async (e) => {
        e.preventDefault();
        setUpdateMessage("");
        const validationErrors = passwordvalidation(newPassword);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
           
            const res = await fetch("/changepassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ oldPassword, newPassword})
            });
            const data = await res.json();
            if (data.error) {
                    setError({ error: data.error });
            } else {
                    setUpdateMessage(data.message);
                    setOldPassword("");
                    setNewPassword("");
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
                        <h3 class="card-title text-center mb-5">Change Password</h3>
                        {updateMessage && <h5 class="text-center">{updateMessage}</h5>}
                        <form method="POST">
                        {errors.error && <p style={{color:"Black",fontSize:"20px",textAlign:"center"}}>{errors.error}</p>}
                            <div class="mb-4">
                                <label for="oldpassword" class="form-label">Old Password</label>
                                <input type="password" class="form-control" name="oldpassword" id="oldpassword" placeholder="Enter old password" value={oldPassword}
                onChange={(e)=>{setOldPassword(e.target.value)}} />
                            </div>
                            
                            <div class="mb-4">
                                <label for="newpassword" class="form-label">New Password</label>
                                <input type="password" class="form-control" name="newpassword" id="newpassword" placeholder="Enter new password" value={newPassword}
                onChange={(e)=>{setNewPassword(e.target.value)}} />
                            {errors.password && <p style={{color:"red",fontSize:"13px",}}>{errors.password}</p>}
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

export default ChangePassword;


