import React from "react";
import AllMovies from "./Movies/AllMovies";
import Intro from "./Intro/Intro";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import "./Homepage.css";

function Homepage() {
    const history = useHistory();

    return (
        <div className="container_home">
            <div className="homediv1">
                <img
                    className="homeimg"
                    src="../images/banner.jpg"
                    alt="download from store"
                />
            </div>
            <Intro/>
            <AllMovies/>


            <div className="row">
                <div className="div_slides">
                    <br/> <br/>
                    <div align="center">
                        <h1 className="allMovie_text1">UPCOMING MOVIES</h1>
                    </div>


                    <h2 className="topic1">English</h2>
                    <div className="slidershow1 middle1">
                        <div className="slides">
                            <input type="radio" name="r" id="r1"/>
                            <input type="radio" name="r" id="r2"/>
                            <input type="radio" name="r" id="r3"/>
                            <input type="radio" name="r" id="r4"/>
                            <input type="radio" name="r" id="r5"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src="../images/banner.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text" align="center">K.G.F Chapter 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text" align="center">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp1.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp2.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp3.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r1" class="bar"></label>
                            <label for="r2" class="bar"></label>
                            <label for="r3" class="bar"></label>
                            <label for="r4" class="bar"></label>
                            <label for="r5" class="bar"></label>
                        </div>
                    </div>


                    <h2 className="topic2">Hindi</h2>
                    <div className="slidershow2 middle2">
                        <div className="slides">
                            <input type="radio" name="r" id="r6" checked/>
                            <input type="radio" name="r" id="r7"/>
                            <input type="radio" name="r" id="r8"/>
                            <input type="radio" name="r" id="r9"/>
                            <input type="radio" name="r" id="r10"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp9.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Bumble Bee</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r6" class="bar"></label>
                            <label for="r7" class="bar"></label>
                            <label for="r8" class="bar"></label>
                            <label for="r9" class="bar"></label>
                            <label for="r10" class="bar"></label>
                        </div>
                    </div>


                    <h2 className="topic3">Tamil</h2>
                    <div className="slidershow3 middle3">
                        <div className="slides">
                            <input type="radio" name="r" id="r11" checked/>
                            <input type="radio" name="r" id="r12"/>
                            <input type="radio" name="r" id="r13"/>
                            <input type="radio" name="r" id="r14"/>
                            <input type="radio" name="r" id="r15"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp2.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Ice Age 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Naan E</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">Doctor Straing 2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r11" class="bar"></label>
                            <label for="r12" class="bar"></label>
                            <label for="r13" class="bar"></label>
                            <label for="r14" class="bar"></label>
                            <label for="r15" class="bar"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
