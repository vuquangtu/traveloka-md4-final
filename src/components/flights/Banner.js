import React, { useState } from "react";
import "../../style/scss/flight/_banner.scss";
function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const numSlides = 2;

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(
      currentSlide === numSlides - 1 ? numSlides - 1 : currentSlide + 1
    );
  };

  return (
    <div>
      <section className="flight-banner-section">
        <div className="flight-banner-section-container">
          <div
            className="flight-banner-section-container-gallery"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="flight-banner-section-container-gallery-card">
              <img
                className="flight-banner-section-image"
                src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/07/1709796771719-fcc19ece4dc3bbd6fdce61eaf9adcbb3.png?tr=h-230,q-75,w-472"
                alt="Flight  1"
              />
              <img
                className="flight-banner-section-image"
                src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/04/1709539387019-8eaa9573e93aa91bfb6a53d321d12d21.jpeg?tr=h-230,q-75,w-472"
                alt="Flight  2"
              />
              <div className="flight-banner-section-container-gallery-card">
                <img
                  className="flight-banner-section-image !max-width-none"
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/12/1710215096110-75a1cf9453c99ac3fb64e5e9aa5c4512.jpeg?tr=h-230,q-75,w-472"
                  alt="Flight 3"
                  style={{ maxWidth: "none" }}
                />
                <img
                  className="flight-banner-section-image !max-width-none"
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2024/03/17/1710648210014-25d9aa01241335d123e9b4bcccb2217b.jpeg?tr=h-230,q-75,w-472"
                  alt="#"
                  style={{ maxWidth: "none" }}
                />
                <img
                  className="flight-banner-section-image !max-width-none"
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2024/02/29/1709190883390-4928a82187a68e03236fe6f9c738342b.png?tr=h-230,q-75,w-472"
                  alt="#"
                  style={{ maxWidth: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flight-banner-section-navigation">
          <i
            className="fa-solid fa-arrow-left"
            style={{ color: "#fff" }}
            onClick={handlePrevSlide}
          ></i>

          <p
            className="flight-banner-section-navigation-text"
            style={{ color: "#fff" }}
          >
            Xem thêm khuyến mãi
          </p>
          <i
            className="fa-solid fa-arrow-right"
            style={{ color: "#fff" }}
            onClick={handleNextSlide}
          ></i>
        </div>
      </section>
    </div>
  );
}

export default Banner;
