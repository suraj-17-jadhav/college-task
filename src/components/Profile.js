import React, { useEffect, useState } from "react";
import "./Profile.css";
import PostDetail from "./PostDetail";

const Profile = () => {
  var picLink =
    "https://t4.ftcdn.net/jpg/01/18/03/35/240_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg";

  const[pic,setPic]=useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const[user,setUser]=useState("");

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then((res) => res.json())
    .then((result) => {
    console.log(result);
    setPic(result);
    setUser(result.user)
    console.log(pic);
    });
  }, []);

  return (
    <div className="profile">
      {/* profile frame */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={picLink} alt="" />
        </div>

        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length:"0" } posts</p>
          </div>
        </div>
      </div>

      <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />

      {/* gallery */}
      <div className="gallery"> 
      {
          pic.map((pics)=>{
            return (
              <img key={pics._id} src={pics.photo} 
              onClick={()=>{
                toggleDetails(pics);
              }}
              className="item"></img> 
            );
          })
      }
      </div>

      {show &&
        <PostDetail  item={posts} toggleDetails={toggleDetails}/>
      }

    </div>
  );
};

export default Profile;
