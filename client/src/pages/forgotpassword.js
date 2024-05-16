import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import logo from "./images/logo.png";
// import image from "./images/logo.png";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  async function forgotpassword(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/forgotpassword", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const user = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(user.message);
        console.log(user.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    // <section>
      <div>
        <div className="container">
          <div className="col-lg-6 login">
            {success ? (
              <div>
                <img
                  src="./images/logo.png"
                  width={300}
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    textAlign: "center",
                    color: "green",
                  }}
                >
                  Email Sent successfully:
                </h3>
              </div>
            ) : (
              <form className="form" onSubmit={forgotpassword}>
                <img
                  src="./images/logo.png"
                  width={150}
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    textAlign: "center",
                  }}
                >
                  Forgot Password:
                </h3>
                <label className="userid" htmlFor="student-id">
                  Email:
                </label>
                <br />
                <input
                  required
                  className="useridbox"
                  placeholder="Enter Email Here..."
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <p class="error">{error}</p>
                <br />
                <button className="button1" type="submit">
                  Send Email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
  );
};


export default ForgotPassword;
