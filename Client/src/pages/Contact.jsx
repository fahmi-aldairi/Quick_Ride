/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import emailjs from "emailjs-com";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/contact.css";


const Contact = () => {
  const form = useRef(null);
  const [message, setMessage] = useState({
    msg: "",
    theme: "",
  });

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_kf36l0v",
        "template_hsgme34",
        event.target, // Pass the HTML form element
        "gYrOQgVA7PuiLFEAU"
      )
      .then(
        (result) => {
          setMessage({
            msg: "Your message has been sent successfully, our team will contact you as soon as possible.",
            theme: "success",
          });
        },
        (error) => {
          setMessage({
            msg: "Something went wrong, please try again later!",
            theme: "danger",
          });
          console.log("massage error: " + error);
        }
      );
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container className="w-75 d-flex justify-content-center custom-color shadow">
          <Row className="w-75">
            <Col lg="15" md="15">
              <h6 className="fw-bold mb-4  d-flex  justify-content-center fs-3 custom-colors mt-4">
                Get In Touch
              </h6>

              <Form onSubmit={sendEmail} ref={form}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" name="from_name" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" name="email_" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea w-100"
                    name="message"
                    style={{padding:"5px" , border:"0", borderRadius:"0.375rem"}}
                  ></textarea>
                </FormGroup>

                <div className=" d-flex align-items-center justify-content-center gap-4 mt-3 flex-column mt-3">
                  <button className=" contact__btn" type="submit">
                    Send Message
                  </button>
                </div>
              </Form>
              <p className={`font-bold mt-3 text-center text-${message.theme}`}>
                {message.msg}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
