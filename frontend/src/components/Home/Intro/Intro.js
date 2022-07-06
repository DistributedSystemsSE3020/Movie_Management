import React from 'react'
import Aos from "aos";
import "aos/dist/aos.css"
import "./Intro.css";

function Intro() {

    Aos.init({duration:2000})

    return (
            <div className="intro_bg">
                <div className="row introCard">
                    <div className="col-7 px-5 pt-5">
                        <div data-aos="fade-up"><br/><br/>
                            <h1 className='h1'>Filming Experience <br/> &emsp;&emsp;&emsp;Just Got Better</h1>
                        </div>
                        <br/>
                        <div data-aos="fade" className="px-3 pt-3 text-muted">
                            <p className='p'>
                            Popcorn Scope is dedicated to lifting the bar in Sri Lanka's cinema experience, aiming to provide our guests with all the charm of old-school movie theaters, combined with cutting-edge sophistication and comfort that meets worldwide standards.
                            </p>
                            <p className='p'>
                            Popcorn Scope is dedicated to lifting the bar in Sri Lanka's cinema experience, aiming to provide our guests with all the charm of old-school movie theaters, combined with cutting-edge sophistication and comfort that meets worldwide standards.
                            </p>
                        </div>
                    </div>
                    <div className="col-5 pb-5">
                        <img src="../images/logo.png" alt="download from store" width="600px" />
                    </div>
                </div>
            </div>
    )
}

export default Intro
