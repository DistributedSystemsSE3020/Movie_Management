import React from 'react'
import './Footer.css'
import { blue} from '@material-ui/core/colors';
import {Link,useHistory } from 'react-router-dom'; 
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GoogleMap from '../GoogleMap/GoogleMap';

function Footer() {
    const history=useHistory();
    function RateUs(){
        history.push("/customer/review")
    }
    return (
        <footer className="px-5">
            <div className="">
                <div className="row">
                    <div className="col-xl-1" align="center">
                        <br/>
                        <img src="/images/Logo.png" className="logoFooter" alt="logo"/>
                    </div>
                    <div className="col-xl-3"style={{ paddingLeft: 70 }}>
                        <br/>
                        <p>
                        Popcorn Scope is dedicated to lifting the bar in Sri Lanka's cinema experience, aiming to provide our guests with all the charm of old-school movie theaters, combined with cutting-edge sophistication and comfort that meets worldwide standards.   
                        </p>
                    </div>
                    <div className="col-xl-2" align="center">
                        <h3>Links</h3>
                        <ul className="list-group">
                            <li><Link className='list1' to="/">Home</Link></li>
                            <li><Link className='list1' to=""  >About Us</Link></li>
                            <li><Link className='list1' to=""  >Contact Us</Link></li>
                            <li><Link className='list1' to="/admin/signin" >Admin</Link></li>
                        </ul>
                    </div>
                    <div className="col-xl-3" >
                        <h3>&nbsp;Reach Us On </h3>
                        <br/>
                        <p><LocationOnIcon fontSize="small"/>&nbsp;No.14 , New Kandy Road, Malabe</p>
                        <p><EmailIcon fontSize="small"/>&nbsp; info.popcornscopecinemas@gmail.com</p>
                        <p><PhoneIcon fontSize="small"/>&nbsp;011 - 4534232</p>
                    </div>
                    <div className="col-xl-3"align="center">
                        <h6> We value your feedback</h6>    
                        <Rating name="size-large" defaultValue={5} size="large"  />
                        <br/><br/>
                        <Button variant="contained" style={{backgroundColor:'red',color:'white'}} endIcon={<RateReviewIcon/>}
                                onClick={RateUs} >
                            Rate US 
                        </Button> 
                        <br/> <br/>
                        <span>
                            <img src="https://img.icons8.com/color/48/000000/facebook-circled--v4.png" alt="facebook"/>
                            <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="instagram"/>
                            <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png" alt="twitter"/>
                        </span>
                    </div><br/><br/><br/>
                    <div className="map">
                        <div>
                            <GoogleMap />
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 text-center " style={{marginTop:'50px'}}> 
                    <p className ="mb-0"> <h6>POPCORN SCOPE CINEMAS ?? 2022 - All Rights Reserved</h6></p>
                </div>
                <br/>
            </div>
        </footer>
    )
}

export default Footer
