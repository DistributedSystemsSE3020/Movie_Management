import React, {useEffect, useState} from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { orange, green, red, blue } from '@material-ui/core/colors';
import axios from 'axios';
import './Profile.css';


function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const history = useHistory();
    const location = useLocation();

    //getting user data
    useEffect(() => {
        async function fetchUser(){
            await axios.get(`http://localhost:8070/customer/${user._id}`).then((res)=>{
                //setting user
                localStorage.setItem("user", JSON.stringify(res.data.result))

                setUser(JSON.parse(localStorage.getItem('user')))

            }).catch((error)=>{
                alert("Failed to fetch item data")
            })
        }
        fetchUser()
        
    },[user._id,location])

    //redirecting to update page
    function editCardData() {
        history.push(`/customer/updateprofile/${user._id}`)
    }

    //redirecting to generate report page
    function GenerateReport() {
        history.push(`/customer/report`)
    }
    
    //reset password
    async function ResetPassword(){
        let email = user.email
        try {
            await axios.post("http://localhost:8070/customer/forgotpassword", {email});

            alert(`We have sent a password reset link to ${email}`);
        } catch (error) {
            if(error.response.status === 404){
                alert("Please enter the email you use for registering")
            }
            else{
                alert("Something went wrong")
            }
        }
    }

    //delete account
    async function deleteAccount(){
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("customerAuthToken")}`,
            },
        };

        if(window.confirm('Are you sure?\nThis action cannot be undone')){
            await axios.delete(`http://localhost:8070/customer/deleteprofile/${user._id}`, config).then(() => {
                alert("Account deleted successfully")
                localStorage.clear()
                history.push('/customer/signin')
            }).catch((error) => {
                alert(`Failed to delete the Account`)
            })
        }
    }

    //logout
    async function logout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile_div">
        <div className="container">
            <div className="profile_div1">
            <div className="row">
                <div className="col-12">
                <div className="col-1">
                </div>
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-4">
                    <div className="white-card ">
                        <div className="profile_img">
                            {user.imgUrl === ""? 
                                <img src="/images/avatar.jpg" className="rounded-circle" alt="profile pic"/>
                            :
                                <img src={`${user.imgUrl}`} className="rounded-circle" alt="profile pic"/>
                            }
                        </div>
                        <h4>{user.firstname +` `+ user.lastname}</h4>
                        <p>{user.email}</p>
                        <Link className="btn btn-sm btn-primary" to={`/customer/updateprofile/${user._id}`}>Edit Profile</Link>
                    </div>
                </div>
                
                <div className="col-xl-4 px-4">
                    <center>
                        <Button color="primary" variant="contained" className="mb-4 mt-4" fullWidth disableElevation size="large"
                            style={{ backgroundColor: blue[500], color: 'white'}} onClick={logout} endIcon={<ExitToAppIcon/>}>
                            Log Out  
                        </Button>
                        <Button variant="contained" className="mb-4" fullWidth disableElevation size="large" 
                            style={{ backgroundColor: green[400], color: 'white' }} onClick={GenerateReport} endIcon={<CloudDownloadIcon/>}>
                            Generate Report
                        </Button>
                        <Button color="primary" variant="contained" className="mb-4" fullWidth disableElevation size="large"
                            style={{ backgroundColor: blue[500], color: 'white'}} onClick={ResetPassword} endIcon={<LockIcon/>}>
                            Reset Password
                        </Button>
                        <Button color="secondary" variant="contained" fullWidth disableElevation size="large" 
                            onClick={deleteAccount} endIcon={<DeleteIcon/>}>
                            Delete Account
                        </Button>
                    </center>
                </div>

              


            </div> </div>
        </div></div>
    )
}

export default Profile
