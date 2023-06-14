import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/BecomeDriverSection.css";

const sliderImageUrl = [
  //First image url
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933172560056342/Rectangle_43.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933106743025684/Rectangle_34.png",
  },
  //Second image url
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933107074383882/Rectangle_32.png",
  },
  //Third image url
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933172828471366/Rectangle_41.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933173084340314/nissan-logo_1.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933173407285329/honda-logo_1.png",
  },
  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933173713485856/ford-logo_1.png",
  },

  //Fourth image url

  {
    url: "https://cdn.discordapp.com/attachments/1106603223458000987/1115933173956759572/toyota-logo_1.png",
  },
];

const Slider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  return (
    <>
      <div className="title text-center">
        <p className="fw-bold">Brands</p>
      </div>
      <div className="AA">
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
          >
            {sliderImageUrl.map((imageUrl, index) => {
              return (
                <div className="slider ms-0" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                </div>
              );
            })}
          </Carousel>
          <br />
        </div>
      </div>
    </>
  );
};
export default Slider;
