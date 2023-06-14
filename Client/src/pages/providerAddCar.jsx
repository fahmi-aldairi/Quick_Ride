/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

function ProviderAddCar() {
  const navigate = useNavigate();

  const checkAccess = async (role) => {
    const token = localStorage.getItem("token") || "";

    try {
      const res = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data.role !== role) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    checkAccess("provider");
    window.scrollTo(0, 0);
  }, []);
  const [type, setType] = useState();
  const [energy_type, setEnergyEtype] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [rentalPrice, setRentalPrice] = useState();
  const [imagesData, setImagesData] = useState();
  const [seatsNumber, setSeatsNumber] = useState();
  const [cardescription, setCardescription] = useState();

  const handleAddCar = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token") || "";
    let id;

    try {
      const resToken = await axios.get("http://localhost:5000/checkToken", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      id = resToken.data.provider_id;
      console.log(resToken.data.provider_id);
    } catch (err) {
      console.log(err);
    }

    try {
      const getCars = await axios.post("http://localhost:5000/cars", {
        discrabtion: cardescription,
        type: type,
        energy_type: energy_type,
        model: model,
        year: year,
        rental_price: rentalPrice,
        images_data: imagesData,
        seats_number: seatsNumber,
        provider_id: id,
      });

      console.log(getCars);
      toast.success(`Your car was Add you must wait for Admin approval`);
    } catch (err) {
      console.log(err);
      toast.success("Car deleted successfully.");
    }
    event.target.reset();
  };

  function handleCarType(event) {
    const carType = event.target.value;
    setType(carType);
  }
  function handleEnergyType(event) {
    const energyType = event.target.value;
    setEnergyEtype(energyType);
  }
  function handleModel(event) {
    const model = event.target.value;
    setModel(model);
  }
  function handleYear(event) {
    const year = event.target.value;
    setYear(year);
  }
  function handleRentalPrice(event) {
    const rentalPrice = event.target.value;
    setRentalPrice(rentalPrice);
  }
  function handleImgUrl(event) {
    const imgUrl = event.target.value;
    setImagesData(imgUrl);
  }
  function handleSeatNumber(event) {
    const seatsNum = event.target.value;
    setSeatsNumber(seatsNum);
  }
  function handleCardescription(event) {
    const cardescription = event.target.value;
    setCardescription(cardescription);
  }

  return (
    <>
      <div className=" m-5">
        <>
          <form className="d-flex flex-column" onSubmit={handleAddCar}>
            <div className="row">
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder="Car Name"
                    type="text"
                    id="form8Example1"
                    className="form-control"
                    required
                    onChange={handleModel}
                  />
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    type="text"
                    required
                    onChange={handleCarType}
                  >
                    <option selected>Car Type...</option>
                    <option value="Luxury Car">Luxury Car</option>
                    <option value="Vintage Car">Vintage Car</option>
                    <option value="Family Car">Family Car</option>
                    <option value="Off-Road Car">Off-Road Car</option>
                    <option value="Van">Van</option>
                    <option value="4*4">4*4</option>
                    <option value="Classic">Classic</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    type="text"
                    required
                    onChange={handleEnergyType}
                  >
                    <option selected>Energy Type...</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                {/* Name input */}
                <div className="form-outline">
                  <input
                    placeholder=" Rental Price per Day"
                    type="number"
                    id="form8Example3"
                    className="form-control"
                    required
                    onChange={handleRentalPrice}
                  />
                </div>
              </div>
              <div className="col">
                {/* Name input */}
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
                    onChange={handleSeatNumber}
                  />
                </div>
              </div>
              <div className="col">
                {/* Email input */}
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
                    onChange={handleYear}
                  />
                </div>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder="Image Url"
                    type="text"
                    id="form8Example3"
                    className="form-control"
                    required
                    onChange={handleImgUrl}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    placeholder="Car description"
                    type="text"
                    id="form8Example3"
                    className="form-control"
                    required
                    onChange={handleCardescription}
                  />
                </div>
              </div>
              <br />
              <br />

              <div className="d-flex justify-content-center">
                <button
                  className=" w-50 header__btn btn text-white "
                  type="submit"
                >
                  Add Car
                </button>
              </div>
            </div>
          </form>
        </>
      </div>
      <ToastContainer />
    </>
  );
}

export default ProviderAddCar;
