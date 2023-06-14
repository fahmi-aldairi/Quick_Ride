import "../../styles/our-member.css";
import { Col } from "reactstrap";
import fahmi from "../../assets/all-images/fahmi.png";
import omar from "../../assets/all-images/omar.png";
import asma from "../../assets/all-images/asma.png";
import bushra from "../../assets/all-images/bushra.png";
import amro from "../../assets/all-images/amro.png";
import abd from "../../assets/all-images/abd.png";
import iyad from "../../assets/all-images/iyad.png";

const OUR__MEMBERS = [
  {
    name: "Fahmi Aldairi",
    jobTitle: "Scrum Master",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/fahmi-aldairi",
    linkedinUrl: "https://www.linkedin.com/in/fahmialdairi99/",
    imgUrl: fahmi,
  },

  {
    name: "Amro Alkhazaleh",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/amrokh1996",
    linkedinUrl: "https://www.linkedin.com/in/amro-alkhazaleh-3097b9219/",
    imgUrl: amro,
  },

  {
    name: "Iyad Raslan",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/IyadAbed",
    linkedinUrl: "https://www.linkedin.com/in/iyad-raslan/",
    imgUrl: iyad,
  },

  {
    name: "Abdalrahman Alzaro",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/AbdalrahmanAlzaro",
    linkedinUrl: "https://www.linkedin.com/in/abd-alrahman-al-zaro-07b6a4269/",
    imgUrl: abd,
  },

  {
    name: "Bushra-AbuRahma",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/Bushra1995",
    linkedinUrl: "https://www.linkedin.com/in/bushra-abu-rahmeh-686b38165/",
    imgUrl: bushra,
  },

  {
    name: "Asma Rasheed",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/AsmaRasheed99",
    linkedinUrl: "https://www.linkedin.com/in/asma-rasheed-18b441267/",
    imgUrl: asma,
  },

  {
    name: "Omar Hassouna",
    experience: "Full-Stack Developer",
    githubUrl: "https://github.com/OmarHassouna-PS",
    linkedinUrl: "https://www.linkedin.com/in/omar-hassouna-97b76b1aa/",
    imgUrl: omar,
  },
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="3" md="4" sm="6" xs="10" key={index} className="mb-4">
          {/* // <Col key={index} className="mb-4"> */}
          <div className="single__member ">
            <div className="single__member-img">
              <img src={item.imgUrl} alt="" className="w-100 BB" />

              <div className="single__member-social">
                <a href={item.githubUrl}>
                  <i className="ri-github-line"></i>
                </a>

                <a href={item.linkedinUrl}>
                  <i className="ri-linkedin-line"></i>
                </a>
              </div>
            </div>

            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            <p className="section__description text-center">
              {item.experience}
            </p>
          </div>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;
