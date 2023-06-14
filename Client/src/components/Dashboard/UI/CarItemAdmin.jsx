/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const CarItemAdmin = (props) => {
  const { category, Status, price , imgUrl, carName } = props.item;
  return (
    <div className="car__item">
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3>{carName}</h3>
          <span>
            <i className="ri-delete-bin-line"></i>
      
          </span>
        </div>
        <p>{category}</p>
      </div>

      <div className="car__img">
        <img src={imgUrl} alt="" />
      </div>

      <div className="car__item-bottom">
        <div className="car__bottom-left">
          
          <p>
            {Status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarItemAdmin;