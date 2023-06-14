/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CarItemAdmin from "../../components/Dashboard/UI/CarItemAdmin";
import axios from "axios";

const RentedCars = () => {
  const [carData, setCarsData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/rentedCars",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
      setCarsData(data.filter((car) => car.available == false));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "1rem",
          columnGap: "2rem",
          rowGap: "2rem",
          paddingTop: "2rem",
          marginTop: "5rem",
        }}
      >
        {carData?.map((car) => (
          <div className="mb-5">
            <div
              className="car__item"
              style={{
                backgroundColor: "white",
                width: "18rem",
                margin: "0",
                marginLeft: "2rem",
                marginRight: "2rem",
                padding: "0",
              }}
            >
              <div
                className="car__item-top mt-2"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
              </div>
              <div className="car__img">
                <img src={`${car.images_data}`} alt="" className="w-100" />
              </div>

              <div className="car__item-content mt-4 ">
                <h4 className="section__title text-center">{car.model}</h4>
                <h6 className="rent__price text-center mx-5">
                  ${car.rental_price}.00 <span>/ Day</span>
                </h6>

                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4 mx-3">
                  <span className="d-flex align-items-center gap-1">
                    <i className="ri-car-line"></i> {car.type}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <i className="ri-settings-2-line"></i> {car.energy_type}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <i
                      className="ri-calendar-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    {car.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RentedCars;