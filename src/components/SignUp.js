
import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Link , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Toast function
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/


  const postData = () => {
    // cheking email
    if(!emailRegex.test(email)){
      notifyA("Invalid Email")
      return
    }else if(!passRegex.test(password)){
      notifyA("Password must contain at least 8 characters,including at least 1 numeric character,1 special character like !,#,@,$ etc. and 1 uppercase and 1 lowercase character ")
      return
    }
    //sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        userName: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.error){
          notifyA(data.error)
        }else{
          notifyB(data.message)
          navigate("/signin")
        }
      })
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          {/* <img className="signUpLogo" src={logo3} alt="" /> */}
          <p className="loginPara">
            sign up to see videos and photos
            <br /> from your freinds
          </p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Enter your Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
             />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={userName}
              placeholder="Enter your Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="loginpara2">
            By signing up ,you agree to our Terms,
            <br />
            Privacy policy and cookies policy.
          </p>

          <input
            type="submit"
            id="sub-btn"
            value="Sign Up"
            onClick={() => {
              postData();
            }}
          />
        </div>
        <div className="form2">
          Already have an account?
          <Link to="/signin">
            <span className="style"> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp