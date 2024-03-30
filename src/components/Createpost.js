import React, { useState, useEffect } from "react";
import "./Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Createpost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  // Toast function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  //  saving post to mongDb
  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  //   posting images to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "coder-task");
    data.append("cloud_name", "codercloud7");
    fetch("https://api.cloudinary.com/v1_1/codercloud7/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          alt=" "
          src="https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadFile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>

      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt=""
            />
          </div>
          <h5>Suraj</h5>
        </div>
      </div>

      <textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
        type="text"
        placeholder="Write a caption..."
      ></textarea>
    </div>
  );
};

export default Createpost;
