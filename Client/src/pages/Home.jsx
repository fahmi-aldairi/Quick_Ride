import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";
import Testimonial from "../components/UI/Testimonial";
import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import CarItem from "../components/UI/CarItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/services-list.css";

const Home = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars`)
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left amrofahmizaroasmabushraomariyad"></div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            <div className="d-flex justify-content-center flex-wrap">
              {carData.slice(0, 3).map((item) => (
                <CarItem item={item} key={item.id} discount={true}/>
              ))}
            </div>
          </Row>
        </Container>
      </section>
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-3 text-center">
              <h6 className="section__subtitle fw-bold">See our</h6>
              <h2 className="section__title fw-bold">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>

      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />
      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="sectionsubtitle">Our clients says</h6>
              <h2 className="sectiontitle">Testimonials</h2>
            </Col>

            <Testimonial />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
