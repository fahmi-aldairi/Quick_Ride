/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "../../styles/Cars.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const Cars = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [carData, setCarsData] = useState();
  const [CarsDataNotActive, setCarsDataNotActive] = useState();
  const [selectedOption, setSelectedOption] = useState("serviceProviders");
  const [providerData, setproviderData] = useState();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_car/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`car with id: ${id} Not accepted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/accept_car/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`car with id: ${id} Accepted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/delete_car/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      toast.success(`car with id: ${id} deleted!`);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cars", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      setCarsData(data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get("http://localhost:5000/not_active_car", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      setCarsDataNotActive(data);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get("http://localhost:5000/provider", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log(data);
      setproviderData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bookings">
      <div
        className="booking__wrapper "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h2 className="booking__title">All Cars</h2>

        <div
          className="radio-inputs"
          style={{
            width: "fit-content",
            backgroundColor: "#ef621c",
            display: "flex",
            justifyContent: "center",
            position: "fixed",
          }}
        >
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="serviceProviders"
              checked={selectedOption === "serviceProviders"}
              onChange={handleRadioChange}
            />
            <span className="name">All Car</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="joiningRequests"
              checked={selectedOption === "joiningRequests"}
              onChange={handleRadioChange}
            />
            <span className="name">Car Requests</span>
          </label>
        </div>
        {selectedOption === "serviceProviders" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
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
                    <span className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      <b>
                        <p className="fs-6 ms-2 text-black">
                          {providerData?.map((element) => {
                            if (element.provider_id == car.provider_id) {
                              return element.username;
                            }
                          })}
                        </p>
                      </b>
                    </span>
                    <span>
                      <i
                        onClick={() => handleDelete(car.cars_id)}
                        className="ri-delete-bin-line text-danger"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </span>
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
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "5rem",
            }}
          >
            {CarsDataNotActive?.map((car) => (
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
                  <div className="car__item-top mt-2">
                    <div
                      className="d-flex"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="d-flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                        <b>
                          <p className="fs-6 ms-2 text-black">
                            {providerData?.map((element) => {
                              if (element.provider_id == car.provider_id) {
                                return element.username;
                              }
                            })}
                          </p>
                        </b>
                      </span>
                      <span className="d-flex">
                        <button
                          onClick={() => handleReject(car.cars_id)}
                          className="btn btn-danger"
                          style={{
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            justifyItems: "end",
                          }}
                        >
                          <i className="ri-close-line"></i>
                        </button>
                        <button
                          onClick={() => handleAccept(car.cars_id)}
                          className="btn btn-success"
                          style={{
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "1rem",
                          }}
                        >
                          <i className="ri-check-line"></i>
                        </button>
                      </span>
                    </div>
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
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cars;
