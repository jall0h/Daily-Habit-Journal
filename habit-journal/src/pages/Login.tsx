import { useRef, useState } from "react";
import select from "../assets/PixelSelect.png";
import apiClient from "../services/api-client";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = () => {
    console.log(usernameRef.current);
    console.log(passwordRef.current);
    if (usernameRef && passwordRef) {
      apiClient
        .post("/auth/jwt/create/", {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          console.log(res.data);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data?.detail);
          setUsernameError(err.response.data.username?.[0]);
          setPasswordError(err.response.data.password?.[0]);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        });
    }
  };

  const container = document.getElementsByClassName("button")[0];
  const triangle = document.getElementById("login-select");
  const button = document.getElementById("login-btn");

  container?.addEventListener("mouseover", function () {
    {
      if (triangle) {
        console.log("bounce");

        triangle.style.visibility = "visible";
        triangle.classList.add("bounce");
      }
    }
  });

  container?.addEventListener("mouseout", function () {
    if (triangle) {
      triangle.style.visibility = "hidden";
      triangle.classList.remove("bounce");
    }
  });
  return (
    <div className="login-container">
      <div>
        <h1 className="login-title">LOGIN PAGE</h1>
      </div>
      {error && <p>{error}</p>}
      <div className="form-container">
        <form
          id="login-form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div>
            {usernameError && <p>{usernameError}</p>}
            <input
              className="input login-input"
              type="text"
              name="username"
              placeholder="Enter Username"
              ref={usernameRef}
            ></input>
          </div>
          <div>
            {passwordError && <p>{passwordError}</p>}
            <input
              className="input login-input"
              type="password"
              name="username"
              placeholder="Enter Password"
              ref={passwordRef}
            ></input>
          </div>
          <div className="button ">
            <img id="login-select" src={select} />
            <button id="login-btn" className="btn__primary" type="submit">
              START
            </button>
          </div>
        </form>
      </div>
      <div className="button ">
        <img id="login-select" src={select} />
        <button
          id="register-btn"
          className="btn__primary"
          type="button"
          onClick={() => {
            navigate("/register");
          }}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default Login;
