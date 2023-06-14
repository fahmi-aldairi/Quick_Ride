/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";
import Facebook from "./SignInWithFacebook";
import Google from "./SignInWithGoogle";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [path, setPath] = useState("/signIn");
  const [userCheck, setUserCheck] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [passwordMode, setPasswordMode] = useState(true);
  const [passwordModeCon, setPasswordModeCon] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (location.search === "?CheckOut") setPath("/payment");
  }, []);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const [checkInput, setCheckInput] = useState({
    username: false,
    phone: false,
    email: false,
    address: false,
    password: false,
    confirmPassword: false,
    address: false,
    type: false,
  });

  const [massageWarning, setMassageWarning] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    submit: "",
    type: "",
  });

  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }
  function handlePasswordModeCon() {
    setPasswordModeCon(!passwordModeCon);
  }

  function handleUsername(event) {
    const name = event.target.value;
    setCheckInput({ ...checkInput, username: false });

    if (name === "") {
      setMassageWarning({ ...massageWarning, username: "Required!" });
    } else {
      setMassageWarning({ ...massageWarning, username: "" });
      setUser({ ...user, name: name });
      setCheckInput({ ...checkInput, username: true });
    }
  }

  function handleAddress(event) {
    const address = event.target.value;
    setCheckInput({ ...checkInput, address: false });

    if (address === "") {
      setMassageWarning({ ...massageWarning, address: "Required!" });
    } else {
      setMassageWarning({ ...massageWarning, address: "" });
      setUser({ ...user, address: address });
      setCheckInput({ ...checkInput, address: true });
    }
  }

  function handlePhone(event) {
    const patternPhone = /^07\d{8}$/;
    setCheckInput({ ...checkInput, phone: false });
    const phone = event.target.value;

    if (phone === "") {
      setMassageWarning({ ...massageWarning, phone: "Required!" });
    } else if (!patternPhone.test(phone)) {
      setMassageWarning({ ...massageWarning, phone: "Invalid number" });
    } else {
      setMassageWarning({ ...massageWarning, phone: "" });
      setUser({ ...user, phone: phone });
      setCheckInput({ ...checkInput, phone: true });
    }
  }

  async function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    setCheckInput({ ...checkInput, email: false });
    const email = event.target.value;

    if (email === "") {
      setMassageWarning({ ...massageWarning, email: "Required!" });
    } else if (!patternEmail.test(email)) {
      setMassageWarning({ ...massageWarning, email: "Invalid email" });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setUser({ ...user, email: email });
      setCheckInput({ ...checkInput, email: true });
    }
  }

  function handlePassword(event) {
    // more than 8 characters, with at least 1 number, uppercase, and special characters.
    const patternPassword =
      /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    setCheckInput({ ...checkInput, password: false });
    const password = event.target.value;

    if (password === "") {
      setMassageWarning({ ...massageWarning, password: "Required!" });
    } else if (!patternPassword.test(password)) {
      setMassageWarning({
        ...massageWarning,
        password:
          "Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters",
      });
    } else {
      setMassageWarning({ ...massageWarning, password: "" });
      setUser({ ...user, password: password });
      setCheckInput({ ...checkInput, password: true });
    }
  }

  function handleConfirmPassword(event) {
    const password = event.target.value;

    setCheckInput({ ...checkInput, confirmPassword: false });

    if (password === "") {
      setMassageWarning({ ...massageWarning, confirmPassword: "Required!" });
    } else if (password !== user.password) {
      setMassageWarning({
        ...massageWarning,
        confirmPassword: "Password does not match",
      });
    } else {
      setMassageWarning({ ...massageWarning, confirmPassword: "" });
      setCheckInput({ ...checkInput, confirmPassword: true });
    }
  }

  function handleUserType(e) {
    const type = e.target.value;
    setCheckInput({ ...checkInput, type: false });

    if (type === "") {
      setMassageWarning({
        ...massageWarning,
        type: "Please select a user type",
      });
    } else {
      setMassageWarning({
        ...massageWarning,
        type: "",
      });
      setSelectedUserType(e.target.value);
      setCheckInput({ ...checkInput, type: true });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(checkInput.username ,checkInput.email ,checkInput.phone ,checkInput.password ,checkInput.confirmPassword, checkInput.address)
    if (
      checkInput.username &&
      checkInput.email &&
      checkInput.phone &&
      checkInput.password &&
      checkInput.confirmPassword &&
      checkInput.address &&
      checkInput.type
    ) {
      sendDataToServer(user);
      event.target.reset();
      navigate(path);
    } else {
      setMassageWarning({
        ...massageWarning,
        submit:
          "Please fill in all fields or verify that the input is correct.",
      });
    }
  }

  function sendDataToServer(user) {
    if (selectedUserType === "customer") {
      axios
        .post("http://localhost:5000/users", user)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setMassageWarning({
            ...massageWarning,
            email: "Email is already exist",
          });
          setUser({ ...user, email: email });
          console.error(err);
        });
    } else if (selectedUserType === "provider") {
      axios
        .post("http://localhost:5000/provider", user)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setMassageWarning({
            ...massageWarning,
            email: "Email is already exist",
          });
          setUser({ ...user, email: email });
          console.error(err);
        });
    }
  }

  return (
    <div className="container-fluid">
      <div className="row bg-gray-100 text-gray-900 justify-content-center ">
        <div className="col-lg-8 col-md-8 w-100">
          <div className="row m-0 m-sm-20 bg-white shadow-sm rounded-lg d-flex justify-content-center">
            <div className="col-lg-5 col-md-12">
              <div className="mt-12 d-flex flex-column align-items-center">
                <h1
                  className="text-2xl text-xl-3xl font-weight-bold"
                  style={{ color: "#000d6b" }}
                >
                  Sign Up to Join Us!
                </h1>
                <div className="w-100 flex-1 mt-8">
                  <form onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-xs">
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
                            value="provider"
                            checked={selectedUserType === "provider"}
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
                            value="customer"
                            checked={selectedUserType === "customer"}
                            type="radio"
                            id="customer"
                            name="flexRadioDefault"
                            className="form-check-input"
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-warning-600">
                        <span className="font-weight-medium">
                          {massageWarning.type}
                        </span>
                      </p>
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          User name
                        </label>
                        <input
                          onChange={handleUsername}
                          type="text"
                          id="name"
                          className="form-control rounded-lg"
                          placeholder="Enter your name"
                        />
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.username}
                          </span>
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          Phone
                        </label>
                        <input
                          onChange={handlePhone}
                          type="text"
                          id="phone"
                          className="form-control rounded-lg"
                          placeholder="Enter your phone"
                        />
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.phone}
                          </span>
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          Email
                        </label>
                        <input
                          onChange={handleEmail}
                          type="text"
                          id="email"
                          className="form-control rounded-lg"
                          placeholder="Enter your email"
                        />
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.email}
                          </span>
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          Address
                        </label>
                        <input
                          onChange={handleAddress}
                          type="text"
                          id="address"
                          className="form-control rounded-lg"
                          placeholder="Enter your address"
                        />
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.address}
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 password">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          Password
                        </label>
                        <input
                          onChange={handlePassword}
                          type={passwordMode ? "password" : "text"}
                          id="password"
                          className="form-control rounded-lg"
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
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.password}
                          </span>
                        </p>
                      </div>
                      <div className="mb-3 password">
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-weight-medium"
                        >
                          Confirm Password
                        </label>
                        <input
                          onChange={handleConfirmPassword}
                          type={passwordModeCon ? "password" : "text"}
                          id="confirmPassword"
                          className="form-control rounded-lg"
                          placeholder="Confirm password"
                        />
                        <span className="eye" onClick={handlePasswordModeCon}>
                          <i
                            className={`fas fa-eye ${
                              passwordModeCon ? "d-block" : "d-none"
                            }`}
                            id="showEye"
                          />
                          <i
                            className={`fas fa-eye-slash ${
                              passwordModeCon ? "d-none" : "d-block"
                            }`}
                            id="hideEye"
                          />
                        </span>
                        <p className="mt-2 text-sm text-warning-600">
                          <span className="font-weight-medium">
                            {massageWarning.confirmPassword}
                          </span>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="mt-3 btn w-100 py-3 rounded-lg d-flex align-items-center justify-content-center Abd"
                        style={{ backgroundColor: "#000d6b" }}
                      >
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ color: "white" }}
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>

                        <span style={{ color: "white" }}>Sign Up</span>
                      </button>
                      <p className="mt-2 text-sm text-warning-600">
                        <span className="font-weight-medium">
                          {massageWarning.submit}
                        </span>
                      </p>
                      <p className="mt-2 text-sm">
                        You already have an account!
                        <Link
                          to="/signIn"
                          className="font-weight-bold text-primary-600"
                        >
                          SignIn
                        </Link>
                      </p>
                    </div>
                    <div className="mt-3 d-flex flex-column align-items-center">
                      <div className="my-4 border-bottom text-center">
                        <div className="px-2 d-inline-block text-lg text-secondary font-weight-medium bg-white translate-middle-y">
                          Or Sign Up With
                        </div>
                      </div>
                      <div className="w-100 mt-4">
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
      </div>
    </div>
  );
}
