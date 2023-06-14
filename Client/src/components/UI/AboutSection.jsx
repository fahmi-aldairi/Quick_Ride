/* eslint-disable react/prop-types */
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle fw-bold">About Us</h4>
              <h2 className="section__title">Welcome to Quick Ride service</h2>
              <p className="section__description">
                LET US HELP YOU FIND THE RIGHT VEHICLE FOR YOUR BUDGET.
                GUARANTEED THE MOST AFFORDABLE AUTO RENTAL AND LEASING PROGRAM
                YOU’LL FIND!
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Wide Vehicle
                  Selectin
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Flexible Rental
                  Periods
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Insurance Coverage
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Convenient Pick-up
                  and Drop-off
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img
                src="https://media.istockphoto.com/id/482317724/photo/generic-black-car.jpg?s=612x612&w=0&k=20&c=znbB4j1B28TpXF4I0ZyEGA3ZebNdmFz9MaikOHCQlUo="
                alt=""
                className="w-100"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
