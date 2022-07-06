import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./SignIn.css";

function Login() {
  const CLIENT_ID = process.env.REACT_APP_Google_ClientID;

  const [showPassword, setShowPassword] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //show hide password
  function handleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  async function signIn(event) {
    event.preventDefault();

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    try {
      //getting data from backend
      const { data } = await axios.post(
        "http://localhost:8280/customer/signinCustomer",
        { email, password },
        config
      );

      //setting the customer authorization token
      localStorage.setItem("customerAuthToken", `Customer ${data.token}`);
      //setting user
      localStorage.setItem("user", JSON.stringify(data.result));

      history.push("/");
    } catch (error) {
      if (error.response.status === 404) {
        alert("Invalid Email");
      } else if (error.response.status === 400) {
        alert("Password Incorrect");
      } else {
        alert("Authentication Failed");
      }
    }
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    //setting the customer authorization token
    localStorage.setItem("customerAuthToken", `Customer ${token}`);
    //setting user
    localStorage.setItem("user", JSON.stringify(result));

    history.push("/");
  };

  const googleFailure = (error) => {
    alert("Something went wrong");
  };

  return (
    <div align="center" className="bg_signin">
      <img
        className="homeimg"
        src="../images/downloadApp9.jpg"
        alt="download from store"
      />
      <div className="" align="center">
        <br /> <br /> <br />
        <div className="card-form signForm">
          <form className="boxSignIn" onSubmit={signIn}>
            <h1 className="form-h1">Login</h1>
            <p className="text-muted"> All your Movie needs at one place!</p>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              handleShowPassword={handleShowPassword}
              required
            />
            <span className="showhide">
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </span>

            <Link className="forgot" to="/customer/forgotpassword">
              Forgot password?
            </Link>
            <input
              className="form-submit-btn button2"
              type="submit"
              value="Sign In"
            />

            <p className="text-muted">or</p>

            <GoogleLogin
              clientId={CLIENT_ID}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              theme="dark"
            />
            <br></br>
            <br></br>
            <br></br>
            <div className="text-muted">
              <p>
                Don't have an account?{" "}
                <Link to="/customer/signup" className="signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
