/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/about",
    display: "Who we are",
  },
  {
    path: "/contact",
    display: "Get In Touch",
  },
  {
    path: "/providerAddCar",
    display: "Add Cars",
  },
  {
    path: "/ProviderUplodedCar",
    display: "Edit Your Cars",
  },
];

const Header = ({ isLog, updateIsLog }) => {
  const [userData, setUserData] = useState();
  const [navLinks, setNavLinks] = useState();
  const [activeLink, setActiveLink] = useState("/home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    console.log(link);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token") || "";

    try {
      const response = await axios.get(`http://localhost:5000/get_provider`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = response.data[0];
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    setNavLinks(Links);
  }, [isLog]);

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  function handleButton() {
    updateIsLog(false);
    localStorage.removeItem("token");
    fetchData();
    setNavLinks([a]);
  }

  return (
    <header className="header" id="Nav">
      {/* =============== header top =========== */}
      <div className="header__middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-md-3 col-sm-4 me-auto">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>QuickRide</span>
                  </Link>
                </h1>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 col-sm-0 d-flex align-items-center justify-content-end gap-2">
              {isLog ? (
                <button className="header__btn btn">
                  <Link to="/userProfile">
                    <i className="ri-user-line"></i>
                  </Link>
                </button>
              ) : null}


              {isLog ? (
                <></>
              ) : (
                <button className="header__btn btn">
                  <Link to="/signUp">Register</Link>
                </button>
              )}
              <button className="header__btn btn">
                {isLog ? (
                  <Link onClick={handleButton} to="/signIn">
                    Log Out
                  </Link>
                ) : (
                  <Link to="/signIn">Sign In</Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <div className="container">
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks?.map((item, index) => {
                  if (userData?.role === "provider") {
                    {
                      return (
                        <NavLink
                          to={item.path}
                          activeClassName="nav__active"
                          onClick={() => handleLinkClick(item.path)}
                          className={
                            activeLink === item.path
                              ? "nav__item text-warning"
                              : "nav__item"
                          }
                          key={index}
                        >
                          {item.display}
                        </NavLink>
                      );
                    }
                  } else {
                    if (
                      item.path !== "/providerAddCar" &&
                      item.path !== "/ProviderUplodedCar"
                    ) {
                      return (
                        <NavLink
                          to={item.path}
                          activeClassName="nav__active"
                          onClick={() => handleLinkClick(item.path)}
                          className={
                            activeLink === item.path
                              ? "nav__item text-warning"
                              : "nav__item"
                          }
                          key={index}
                        >
                          {item.display}
                        </NavLink>
                      );
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
