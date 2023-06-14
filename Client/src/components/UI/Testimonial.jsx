import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpeg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpeg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
          I recently rented a car from this car rental company, and I had a
          fantastic experience. The staff was friendly and professional, and
          they helped me find the perfect car for my needs. The rental process
          was quick and efficient, and the car was clean and well-maintained. I
          had no issues during my rental period, and the return process was
          equally smooth. I highly recommend for their excellent service and
          drop-off locations.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">John Smith</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          I had an amazing experience renting a car from this company. The
          customer service was outstanding, and the staff went above and beyond
          to ensure my satisfaction. The car I rented was in excellent
          condition, and it provided a comfortable and enjoyable driving
          experience throughout my trip. The rental rates were also reasonable,
          and I appreciated the flexibility in terms of pick-up and drop-off
          locations.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Tom croz</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          I have rented cars from various companies in the past, but my recent
          experience with this car rental company was by far the best. The
          reservation process was simple and straightforward, and the staff was
          friendly and helpful. The car I rented was clean, fuel-efficient, and
          reliable. I appreciated the clear and transparent pricing, with no
          hidden fees or surprises. Overall, and I would highly recommend this
          company to others.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Michael Davis</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          I cannot speak highly enough about my experience with this car rental
          company. From the moment I made the reservation, the staff was
          attentive and responsive, answering all my questions promptly. The car
          I rented exceeded my expectations in terms of cleanliness and
          performance. It was evident that the company takes pride in
          maintaining their fleet to a high standard. The return process was
          quick and efficient.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Mohamed</h6>
            <p className="section__description">Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
