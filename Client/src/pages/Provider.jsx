/* eslint-disable react/no-unescaped-entities */
import Helmet from "../components/Helmet/Helmet";
import carData from "../assets/data/carData";
import { useState } from "react";
import CarProvider from "../components/UI/CarProvider";
import CarRental from "../components/UI/CarRental";

const Provider = () => {
  const defult = () => {
    return (
      <>
        <Helmet title="Cars">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic example"
          ></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex align-items-center gap-3 mb-5">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>

                  <select>
                    <option>Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
              </div>

              {carData.map((item) => (
                <CarProvider item={item} key={item.id} />
              ))}
            </div>
          </div>
        </Helmet>
      </>
    );
  };
  const [elementToDisplay, setElementToDisplay] = useState(defult);

  const myCars = () => {
    setElementToDisplay(
      <Helmet title="Cars">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </div>

            {carData.map((item) => (
              <CarProvider item={item} key={item.id} />
            ))}
          </div>
        </div>
      </Helmet>
    );
  };


  

  const addCars = () => {
    setElementToDisplay(
      <div className=" m-5">
        <>
          <form className="d-flex flex-column">
            <div className="row">
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder="Car Name"
                    type="text"
                    id="form8Example1"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder="Car Type"
                    type="text"
                    id="form8Example2"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    required
                  >
                    <option selected>Energy Type...</option>
                    <option value="1">Hybrid</option>
                    <option value="2">Electric</option>
                    <option value="3">Petrol</option>
                    <option value="3">Diesel</option>
                  </select>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder=" Rental Price per Day"
                    type="text"
                    id="form8Example3"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder=" Seat's Number"
                    type="number"
                    id="form8Example4"
                    className="form-control"
                    min="1"
                    max="10"
                    step="1"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder=" Year of made"
                    type="number"
                    id="form8Example5"
                    className="form-control"
                    min="1900"
                    max="2099"
                    step="1"
                    required
                  />
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col">
                <div className="input-group  d-flex justify-content-center">
                  <div className="input-group-prepend ">
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                      required
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    >
                      Choose Car image
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <br />

              <div className="d-flex justify-content-center">
                <button className=" w-50 header__btn btn text-white ">
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </>
      </div>
    );
  };

  const rentalCar = () => {
    setElementToDisplay(
      <Helmet title="Cars">
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column align-items-center">
            {carData.map((item) => (
              <CarRental item={item} key={item.id} />
            ))}
          </div>
          <div className="d-flex flex-column align-items-center">
            {carData.map((item) => (
              <CarRental item={item} key={item.id} />
            ))}
          </div>
          <div className="d-flex flex-column align-items-center">
            {carData.map((item) => (
              <CarRental item={item} key={item.id} />
            ))}
          </div>
        </div>
      </Helmet>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="btn-group d-flex justify-content-center my-3 w-25"
          role="group"
          aria-label="Basic example"
        >
          <button
            onClick={myCars}
            type="button"
            className="header__btn btn text-white"
          >
            My Cars
          </button>
          <button
            onClick={addCars}
            type="button"
            className="header__btn btn text-white"
          >
            Add Cars
          </button>
          <button
            onClick={rentalCar}
            type="button"
            className="header__btn btn text-white"
          >
            Rental Car
          </button>
        </div>
      </div>

      {elementToDisplay}
    </>
  );
};

export default Provider;
