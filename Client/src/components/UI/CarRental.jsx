/* eslint-disable react/prop-types */
import "../../styles/car-item.css";

function CarRental(props) {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;

  return (
    <div className="col-lg-10 col-md-4 col-sm-6 mb-5">
      <div className="car__item"style={{backgroundColor:"white"}}>
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
        </div>
      </div>
    </div>
  );
}

export default CarRental;
