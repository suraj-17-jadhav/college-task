import "./App.css";
import React, { createContext , useState } from "react";
import { LoginContext } from "./context/LoginContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./components/Createpost";
import Modal from "./components/Modal"


function App() {
 
  const [userLogin, setUserLogin] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin ,setModalOpen}}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/createpost" element={<Createpost />}></Route>
          </Routes>
          <ToastContainer theme="dark" />

          {modalOpen &&  <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
