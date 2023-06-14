/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import dotenv from "react-dotenv";
import "../styles/social.css";
import axios from "axios";

export default function SigInWithFacebook({
  massage,
  path,
  updateIsLog,
  selectedUserType,
}) {
  const navigate = useNavigate();
  const [massageWarning, setMassageWarning] = useState("");

  async function sendDataToServer(user) {
    console.log(user);
    if (selectedUserType === "customer") {
      try {
        const res = await axios.post("http://localhost:5000/users", user);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    } else if (selectedUserType === "provider") {
      axios
        .post("http://localhost:5000/provider", user)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  async function handleSignIn(response) {
    const user = {
      name: response.data.name,
      phone: "Please fill your phone",
      email: response.data.email,
      password: response.data.id,
      address: "Please fill your address",
    };

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
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          sendDataToServer(user);
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
          navigate("/");
          console.log(res);
        })
        .catch((err) => {
          sendDataToServer(user);
        });
    } else {
      setMassageWarning("Please select a user type");
      console.log(selectedUserType);
    }
  }

  function handleError(error) {
    setMassageWarning("Something went wrong, please try again later");
    console.log(error);
  }

  return (
    <>
      <LoginSocialFacebook
        appId={8124395423353822}
        onResolve={handleSignIn}
        onReject={handleError}
        className="w-100"
      >
        <button id="customBtnFac" className="sign-with-account custom-button">
          <div className="p-1">
            <svg
              className="custom-svg me-1"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Ebene 1"
              viewBox="0 0 1024 1024"
              id="facebook-logo-2019"
            >
              <path
                fill="#1877f2"
                d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
              ></path>
              <path
                fill="#fff"
                d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
              ></path>
            </svg>
          </div>

          <span className="custom-text">
            <div></div>
            {massage}
          </span>
        </button>
        <p className="custom-warning">
          <span className="custom-font-medium">{massageWarning}</span>
        </p>
      </LoginSocialFacebook>
    </>
  );
}
