import { NavLink, useNavigate } from "react-router-dom";
import navLinks from "../../../assets/dummy-data/navLinks";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    let Nav = document.getElementById("Nav");
    Nav.style.display = "block";
    let Footer = document.getElementById("Footer");
    Footer.style.display = "block";
    navigate("/");
  }

  return (
    <div className="sidebar p-3">
      <div className="sidebar__top">
        <h2>
          <span>
            <i className="ri-car-line"></i>
          </span>
          QuickRide
        </h2>
      </div>

      <div className="sidebar__content">
        <div className="menu0">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__toggler">
          <span
            onClick={handleLogout}
            style={{
              position: "relative",
              top: "-5rem",
              color: "white",
              cursor:"pointer"
            }}
          >
            <i className="ri-logout-circle-r-line"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
