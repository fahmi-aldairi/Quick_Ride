import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "Who we are",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/contact",
    display: "Get in touch",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer" id="Footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-4 col-sm-12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className="d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>QuickRide</span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              Renting a car provides convenient short-term transportation
              without ownership. <br></br>With diverse vehicle options, flexible
              rental periods, and convenient pick-up/drop-off, <br></br>it
              offers a hassle-free experience. Insurance coverage adds peace of
              mind.
            </p>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ul className="list-unstyled">
                {quickLinks.map((item, index) => (
                  <li key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">123 Zarqa, New-Zarqa, Jordan</p>
              <p className="office__info">Phone: +962-78-2111991</p>
              <p className="office__info">Email: Rent Car@gmail.com</p>
              <p className="office__info">Office Time: 10am - 7pm</p>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i className="ri-copyright-line"></i>Copyright {year}. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
