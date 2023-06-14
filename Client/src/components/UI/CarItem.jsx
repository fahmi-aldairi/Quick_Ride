/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useEffect, useState } from "react";
import axios from "axios";

const CarItem = (props) => {
  const [userType, setUserType] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || false;

    axios
      .get(`http://localhost:5000/checkToken`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserType(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { cars_id, images_data, model, type, energy_type, year, rental_price } =
    props.item;

  return (
    <div className="">
      <div className="car__item" style={{ backgroundColor: "white" }}>
        <div className="car__img">
          <img src={`${images_data}`} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{model}</h4>
          {props.discount ?
            <>
              <h6 className="rent__price text-center text-success">
                ${rental_price}.00 <span>/ Day</span>
              </h6>

              <h6 className="rent__price text-center text-decoration-line-through text-danger">

                ${parseInt(rental_price) + (0.2 * parseInt(rental_price))}.00 <span>/ Day</span>
              </h6>
            </>
            :
            <h6 className="rent__price text-center">
              ${rental_price}.00 <span>/ Day</span>
            </h6>
          }

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {type}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {energy_type}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-calendar-line" style={{ color: "#f9a826" }}></i>
              {year}
            </span>
          </div>
          {userType.role === "provider" ? (
            <>
              <Link to={`/cars/${cars_id}`}>
                <button className="w-100 car__item-btn car__btn-details">
                  Details
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/cars/${cars_id}`}>
                <button className="w-50 car__item-btn car__btn-rent">
                  Rent
                </button>
              </Link>
              <Link to={`/cars/${cars_id}`}>
                <button className="w-50 car__item-btn car__btn-details">
                  Details
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarItem;
