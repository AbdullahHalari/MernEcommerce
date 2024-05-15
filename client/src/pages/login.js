import React, {useState} from "react";
import ReactDOM from "react-dom";
import * as Components from "../components/login";
import { Link, useNavigate, NavLink } from "react-router-dom";


const  Login = ()=> {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  async function signUp(e) {
    // try {
    //   e.preventDefault();
    //   console.log("signup");
    //   const res = await fetch("http://localhost:5000/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //       username,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   if (data.status === 422 || !data) {
    //     console.log("Invalid");
    //   } else {
    //     console.log("success");
    //     // navigation.navigate("/login");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
     e.preventDefault();

     try {
       const response = await fetch("http://localhost:5000/api/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ username,email, password }),
       });

       if (response.ok) {
        //  onSignup();
      toggle(true)
        // navigate('/products',{replace:true})
       } else {
         console.error("Signup failed");
       }
     } catch (error) {
       console.error("Signup failed", error);
     }
  }
  // Assuming email and password are defined somewhere in your component state
  async function login(e) {
    // e.preventDefault();

    // try {
    //   const response = await fetch("http://localhost:5000/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     const token = data.token; // Corrected: Access the 'token' property
    //     console.log("Login successful", token);
    //     // document.cookie = `jwtoken=${token}; path=/`;
    //     navigate("/products");

    //     // Store the token in localStorage or a state management solution
    //   } else {
    //     console.error("Login failed");
    //   }
    // } catch (error) {
    //   console.error("Login failed", error);
    // }
     e.preventDefault();

     try {
       const response = await fetch("http://localhost:5000/api/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify({ email, password }),
       });

       if (response.ok) {
         const data = await response.json();
         console.log(data)
         navigate("/products",{replace:true});
        //  window.location.reload(false);
        //  onLogin(data.token);
       } else {
         console.error("Login failed");
       }
     } catch (error) {
       console.error("Login failed", error);
     }
  }

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Button onClick={signUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={login}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Khush Aamdeed!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Marhaba, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}
export default Login;

