/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { gapi } from "gapi-script";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/social.css";

export default function SignInWithGoogle({ massage, path, updateIsLog }) {
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

  async function handleSignIn(profile) {
    const user = {
      name: "",
      phone: "Please fill your phone",
      email: profile.getEmail(),
      password: profile.getName(),
      address: "Please fill your address",
    };

    console.log(profile.getEmail());

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
    }
  }

  const startApp = () => {
    window.gapi.load("auth2", function () {
      window.gapi.auth2
        .init({
          client_id:
            "450119629221-1opknrqsav5jcb8iqwfuctngbjbmkvfl.apps.googleusercontent.com",
        })
        .then((auth2) => {
          const customBtn = document.getElementById("customBtn");
          customBtn.addEventListener("click", () => {
            auth2
              .signIn()
              .then((googleUser) => {
                handleSignIn(googleUser.getBasicProfile());
              })
              .catch((error) => {
                setMassageWarning(
                  "Something went wrong, please try again later"
                );
                console.log(error);
              });
          });
        });
    });
  };

  startApp();

  return (
    <>
      <button id="customBtn" className="sign-with-account custom-button">
        <div className="p-1">
          <svg className="custom-svg me-1" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
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
    </>
  );
}
