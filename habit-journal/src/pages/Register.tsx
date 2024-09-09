import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import RegisterInput from "../components/RegisterInput";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setLastNameError("");
    setFirstNameError("");
    handleRegister();
  };
  const handleRegister = () => {
    apiClient
      .post("/auth/users/", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        email: emailRef.current?.value,
        first_name: firstNameRef.current?.value,
        last_name: lastNameRef.current?.value,
      })
      .then((res) => {
        console.log(res);
        setMessage("Account Successfully Created");
        console.log(emailRef.current?.value)
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data?.detail);
        setUsernameError(err.response.data.username?.[0]);
        setPasswordError(err.response.data.password?.[0]);
        setEmailError(err.response.data.email?.[0]);
        setLastNameError(err.response.data.last_name?.[0]);
        setFirstNameError(err.response.data.first_name?.[0]);
      });
  };

  return (
    <>
      {message && <p className="success-message">{message}</p>}
      {error && <p>{error}</p>}
      <div className="register-form-container">
        <form
          id="register-form"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >

          <RegisterInput reference={firstNameRef} error={firstNameError} placeholder="Enter First Name" password={false}/>
          <RegisterInput reference={lastNameRef} error={lastNameError} placeholder="Enter Last Name" password={false}/>
          <RegisterInput reference={emailRef} error={emailError} placeholder="Enter Email" password={false}/>
          <RegisterInput reference={usernameRef} error={usernameError} placeholder="Enter Username" password={false} />
          <RegisterInput reference={passwordRef} error={passwordError} placeholder="Enter Password" password={true} />
          <div className="button ">
            <button className="btn__primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
