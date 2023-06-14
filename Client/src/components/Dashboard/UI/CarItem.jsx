/* eslint-disable react/prop-types */
const CarItem = (props) => {
  const { category, Status, rentPrice, imgUrl, carName, groupSize } = props.item;
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
            <i className="ri-user-line"></i> {groupSize}
          </p>
          <p>
            {Status}
          </p>
        </div>

        <p className="car__rent">{rentPrice}jd/d</p>
      </div>
    </div>
  );
};

export default CarItem;
