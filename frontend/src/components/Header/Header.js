import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import onClickOutside from "react-onclickoutside";
import { blue, red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./Header.css";
import "./Sidebar.css";
import AddMovie from "../MovieManagement/AddMovie/AddMovie";

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [cartCount, setCartCount] = useState();
  const [user, setUser] = useState("");
  const [URL, setURL] = useState("/customer");
  const history = useHistory();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);

 

  useEffect(() => {
    //check whether user has signed in
    if (
      localStorage.getItem("customerAuthToken") ||
      localStorage.getItem("adminAuthToken")
    ) {
      setIsSignedIn(true);

      //get user data
      if (localStorage.getItem("user")) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }

      async function getCartCount() {
        await axios
          .get(`http://localhost:8070/cart/${user._id}&shopping`)
          .then((res) => {
            let result = res.data.result;
            setCartCount(result.length);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      getCartCount();

      if (localStorage.getItem("customerAuthToken")) {
        setURL(`/customer`);
      }

    } else {
      setIsSignedIn(false);
    }
  }, [user._id, location]);

  function profile() {
    history.push(`${URL}/profile/`);
  }

  function cart() {
    history.push(`/cart/${user._id}/shopping`);
  }

  function signin() {
    history.push("/customer/signin");
  }

  function signup() {
    history.push("/customer/signup");
  }

  //logout
  async function logout() {
    localStorage.clear();
    history.push("/");
  }

  const showSidebar = () => setSidebar(!sidebar);

  Header.handleClickOutside = () => setSidebar(false);

  function home() {
    history.push("/");
  }

  return (
    <header>
      <div className="container-fluid">
        <div className="black_line"></div>
        <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top header-bg">
          <div className="width_header container-fluid ">
            <ul>
             
            
              
            </ul>
            <div className="header-title">
              <h1 style={{ fontSize: 35, fontWeight: 700 }} onClick={home}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Popcorn&nbsp; Scope&nbsp; Cinemas{" "}
              </h1>

              <button className="home_button">
                {" "}
                <a href="/" className="home_button">Home</a>
              </button>
              <button className="home_button">
                <a href="/movie/movies" className="home_button">Movies</a>
              </button>
              <button className="home_button" onClick={signin}>
                Bookings
              </button>
              <button className="home_button" onClick={signup}>
                Buy a Ticket
              </button>
            </div>

            {isSignedIn && (
                <div  align="center" className="log_out_button" >
                  <Button className="log_out_button" style={{ color:"white", fontWeight:600}}
                      disableElevation
                      size="small"
                      onClick={logout}
                      endIcon={<ExitToAppIcon  style={{ color:"white"}} />}
                  >
                    Log Out
                  </Button>
                </div>
            )}





            <ul className="mx-3">
              {isSignedIn ? (
                <div className="cart_icon" >
                  <IconButton  onClick={cart}>
                    <Badge badgeContent={cartCount} color="error">
                      <ShoppingCartIcon style={{ color:"white"}} fontSize="large" />
                    </Badge>
                  </IconButton>
                  <IconButton onClick={profile}>
                    <Avatar alt="user" src={`${user.imgUrl}`} />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-outline-primary mx-2  signing"
                    onClick={signin}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-outline-primary signing"
                    onClick={signup}
                  >
                    Sign Up
                  </button>
                </div>

              )}



            </ul>
          </div>
        </nav>



      </div>
    </header>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside,
};

export default onClickOutside(Header, clickOutsideConfig);
