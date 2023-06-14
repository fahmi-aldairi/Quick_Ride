/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";
import Facebook from "./SignInWithFacebook";
import Google from "./SignInWithGoogle";

export default function SignIn({ updateIsLog }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [path, setPath] = useState("/");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [passwordMode, setPasswordMode] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || false;
    if (token) {
      checkToken(token).then((resultUsers) => {
        if (resultUsers) {
          updateIsLog(true);
          navigate(path);
        }
      });
    }
  }, []);

  const [massageWarning, setMassageWarning] = useState({
    email: "",
    password: "",
  });

  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }
  function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;

    if (email === "") {
      setMassageWarning({ ...massageWarning, email: "" });
    } else if (!patternEmail.test(email)) {
      setMassageWarning({ ...massageWarning, email: "Invalid email" });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });

      setUser({ ...user, email: email });
    }
  }

  function handlePassword(event) {
    const patternPassword =
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;

    if (password === "") {
      setMassageWarning({ ...massageWarning, password: "" });
    } else if (!patternPassword.test(password)) {
      setMassageWarning({ ...massageWarning, password: "Invalid password" });
    } else {
      setMassageWarning({ ...massageWarning, password: "" });

      setUser({ ...user, password: password });
    }
  }

  function handleUserType(e) {
    setSelectedUserType(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (selectedUserType === "customer") {
      await axios
        .post(`http://localhost:5000/logIn_customer`, {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          updateIsLog(true);
          event.target.reset();
          navigate(path);
          console.log(res);
        })
        .catch((err) => {
          setMassageWarning({
            ...massageWarning,
            submit: "Password or email is incorrect.",
          });
          console.error(err);
        });
    } else if (selectedUserType === "provider") {
      await axios
        .post(`http://localhost:5000/logIn_provider`, {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          updateIsLog(true);
          event.target.reset();
          navigate(path);
          console.log(res);
        })
        .catch((err) => {
          setMassageWarning({
            ...massageWarning,
            submit: "Password or email is incorrect.",
          });
          console.error(err);
        });
    } else {
      await axios
        .post(`http://localhost:5000/logIn_admin`, {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          navigate("/admin");
          console.log(res);
        })
        .catch((err) => {
          setMassageWarning({
            ...massageWarning,
            submit: "Please select a user type",
          });
          console.error(err);
        });
      updateIsLog(false);
    }
  }

  async function checkToken(token) {
    try {
      const response = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <>
      <div className="row bg-gray-100 text-gray-900 justify-content-center mx-0">
        <div className="row max-w-screen-lg m-0 m-sm-20 bg-white shadow-sm rounded-lg justify-content-center">
          <div className="col-lg-5 col-md-7 col-10">
            <div className="mt-12 d-flex flex-column align-items-center">
              <h1
                className="text-2xl text-xl-3xl font-weight-bold text-blue-600"
                style={{ color: "rgb(0, 13, 107)" }}
              >
                Sign In
              </h1>
              <div className="w-100 flex-1 mt-8">
                <div className="d-flex flex-wrap mt-4 align-items-center justify-content-around border border-primary border-opacity-50 rounded-3">
                  <div className="form-check my-3">
                    <label
                      htmlFor="provider"
                      className="form-check-label block text-sm font-weight-medium"
                    >
                      Provider
                    </label>
                    <input
                      onChange={handleUserType}
                      checked={selectedUserType === "provider"}
                      value="provider"
                      type="radio"
                      id="provider"
                      name="flexRadioDefault"
                      className="form-check-input"
                    />
                  </div>
                  <div className="form-check">
                    <label
                      htmlFor="customer"
                      className="form-check-label block text-sm font-weight-medium"
                    >
                      Customer
                    </label>
                    <input
                      onChange={handleUserType}
                      checked={selectedUserType === "customer"}
                      value="customer"
                      type="radio"
                      id="customer"
                      name="flexRadioDefault"
                      className="form-check-input"
                    />
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-xs">
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className={`block mb-2 text-sm font-weight-medium"`}
                      >
                        Email
                      </label>
                      <input
                        onChange={handleEmail}
                        type="text"
                        id="email"
                        className={`form-control rounded-lg`}
                        placeholder="Enter your email"
                      />
                      <p className={`mt-2 text-sm text-warning-600`}>
                        {massageWarning.email}
                      </p>
                    </div>
                    <div className="password">
                      <label
                        htmlFor="password"
                        className={`block mb-2 text-sm font-weight-medium"`}
                      >
                        Password
                      </label>
                      <input
                        onChange={handlePassword}
                        type={passwordMode ? "password" : "text"}
                        id="password"
                        className={`form-control rounded-lg `}
                        placeholder="Enter your password"
                      />
                      <span className="eye" onClick={handlePasswordMode}>
                        <i
                          className={`fas fa-eye ${
                            passwordMode ? "d-block" : "d-none"
                          }`}
                          id="showEye"
                        />
                        <i
                          className={`fas fa-eye-slash ${
                            passwordMode ? "d-none" : "d-block"
                          }`}
                          id="hideEye"
                        />
                      </span>
                      <p className={`mt-2 text-sm text-warning-600`}>
                        {massageWarning.password}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className={`mt-3 btn w-100 py-3 rounded-lg d-flex align-items-center justify-content-center Abd`}
                      style={{ backgroundColor: "#000d6b" }}
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ color: "white" }}
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                      </svg>
                      <span className="ml-3" style={{ color: "white" }}>
                        Sign in
                      </span>
                    </button>
                    <p className={`mt-2 text-sm text-warning-600`}>
                      {massageWarning.submit}
                    </p>
                    <p className={`mt-2 text-sm`}>
                      Don't have an account!
                      <Link
                        to={
                          path === "/payment"
                            ? { pathname: "/signUp", search: "CheckOut" }
                            : "/signUp"
                        }
                        className={`font-weight-bold text-primary-600`}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                  <div className="mt-3 d-flex flex-column align-items-center">
                    <div className="w-100 mt-2">
                      <div className="my-4 border-bottom text-center">
                        <div className="px-2 d-inline-block text-lg text-secondary font-weight-medium bg-white translate-middle-y">
                          Or Sign In With
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <Facebook
                          massage={"Sign in with Facebook"}
                          selectedUserType={selectedUserType}
                        />
                        <Google
                          massage={"Sign in with Google"}
                          selectedUserType={selectedUserType}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
