/* eslint-disable react/no-unescaped-entities */
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";

const About = () => {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img
                  src="https://media.istockphoto.com/id/140805522/photo/woman-hand-fastening-a-seat-belt-in-the-car.jpg?s=612x612&w=0&k=20&c=NOswRqlGV0H7HPp0QS2X4hWL8z5mAFmU2q4kAx-cTf4="
                  alt=""
                  className="w-100 rounded-3"
                />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  We Are Committed To Provide Safe Ride Solutions
                </h2>

                <p className="section__description">
                  Welcome to our car rental website! At [Website Name], we are
                  dedicated to delivering safe and reliable ride solutions.
                  Whether you're planning a road trip, exploring a new city, or
                  simply need a vehicle for your daily commute, we've got you
                  covered. Our extensive fleet of well-maintained cars ensures
                  that you'll find the perfect ride to suit your needs.
                </p>

                <p className="section__description">
                  Your safety is our top priority, and we take pride in
                  providing vehicles that meet the highest standards of quality
                  and security. With our user-friendly platform, competitive
                  prices, and exceptional customer service, we strive to make
                  your car rental experience smooth and hassle-free. Trust us to
                  provide the reliable transportation you deserve, so you can
                  focus on enjoying the journey ahead.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i className="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+962-78-2111991</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <br />
      <br />

      <BecomeDriverSection />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle fw-bold">Experts</h6>
              <h2 className="section__title fw-bold">Our Members</h2>
            </Col>
            <div
              className="d-flex flex-row flex-wrap justify-content-center"
            >
              <OurMembers />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
