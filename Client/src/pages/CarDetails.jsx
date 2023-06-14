/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const CarDetails = () => {
  const { slug } = useParams();

  const [carData, setCarData] = useState([]);
  const [userType, setUserType] = useState(false);

  const getCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cars/${slug}`);
      setCarData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCar();

    const token = localStorage.getItem("token") || false;

    if (token) {
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
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [carData[0]]);

  return (
    <Helmet title={carData[0]?.type}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img
                src={`${carData[0]?.images_data}`}
                alt=""
                className="w-100"
              />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{carData[0]?.model}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${carData[0]?.rental_price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span>
                      <i
                        className="ri-star-s-fill"
                        style={{ color: `#f9a826` }}
                      ></i>
                      <i
                        className="ri-star-s-fill"
                        style={{ color: `#f9a826` }}
                      ></i>
                      <i
                        className="ri-star-s-fill"
                        style={{ color: `#f9a826` }}
                      ></i>
                      <i
                        className="ri-star-s-fill"
                        style={{ color: `#f9a826` }}
                      ></i>
                      <i
                        className="ri-star-s-fill"
                        style={{ color: `#f9a826` }}
                      ></i>
                    </span>
                    ({carData[0]?.rating} ratings)
                  </span>
                </div>
                <p className="section__description">
                  {carData[0]?.discrabtion}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    {carData[0]?.type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    {carData[0]?.energy_type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-calendar-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    {carData[0]?.year}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "2.8rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      className="ri-wheelchair-line"
                      style={{ color: "#f9a826" }}
                    ></i>
                    {carData[0]?.seats_number}
                  </span>
                </div>
              </div>
            </Col>
            <div className="d-flex justify-content-end">
              {userType ? (
                userType.role === "provider" ? (
                  <Link to={`/cars`} className="text-decoration-none">
                    <span className="d-flex justify-content-center mt-4">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#000D6B" }}
                      >
                        Back
                      </Button>
                    </span>
                  </Link>
                ) : (
                  <Link to={`/Checkout/${carData[0]?.cars_id}`} className="text-decoration-none">
                    <span className="d-flex justify-content-center mt-4">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#000d6b" }}
                      >
                        Rent
                      </Button>
                    </span>
                  </Link>
                )
              ) : (
                <Link to={`/signIn`} className="text-decoration-none">
                  <span className="d-flex justify-content-center mt-4">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#000d6b" }}
                    >
                      Rent
                    </Button>
                  </span>
                </Link>
              )}
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
