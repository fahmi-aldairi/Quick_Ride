/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Router from "../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import "./lay.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  document.body.style = "background: var(--body-bg)";
  const navigate = useNavigate();

  const checkAccess = async (role) => {
    const token = localStorage.getItem("token") || "";

    try {
      const res = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.role !== role) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/*");
    }
  };

  const checkAccsees = async (role) => {
    const token = localStorage.getItem("token") || "";
    let id;

    try {
      const res = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.role === role) {
        console.log("Ok");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  useEffect(() => {
    checkAccess("admin");
    window.scrollTo(0, 0);
    var Nav = document.getElementById("Nav");
    Nav.style.display = "none";
    var Footer = document.getElementById("Footer");
    Footer.style.display = "none";
  }, []);
  

  return (
    <div className="mainCont">
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />
          <div className="content">
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
