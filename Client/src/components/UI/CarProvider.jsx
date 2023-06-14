/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

function CarProvider(props) {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;

  return (
    <div className="col-lg-4 col-md-4 col-sm-6 mb-5">
      <div className="car__item" style={{backgroundColor:"white"}}>
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button className="w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${carName}`}>Edit</Link>
          </button>

          <button className="w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${carName}`}>Delete</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarProvider