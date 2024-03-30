import React, { useState, useContext } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const {setUserLogin}=useContext(LoginContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    // cheking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }
    //sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signin successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token)

          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div className="signIn">
      <div>
        <div className="loginForm ">
          {/* <img className="signUpLogo" src={logo3} alt="" /> */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <input type="submit" id="login-btn"  onClick={()=>{postData()}} value="Sign In"  />
          </div>
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
