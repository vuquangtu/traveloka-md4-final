import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";

function CustomPrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="prev-arrow" onClick={onClick}>
      <ArrowBackIosIcon
        className="rounded-full hover:bg-slate-200 py-2 pl-2 cursor-pointer "
        style={{ color: "#0194F3", fontSize: "2.5rem" }}
      />
    </div>
  );
}

function CustomNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="next-arrow" onClick={onClick}>
      <ArrowForwardIosIcon
        className="rounded-full hover:bg-slate-200 py-2 pl-1 cursor-pointer "
        style={{ color: "#0194F3", fontSize: "2.5rem" }}
      />
    </div>
  );
}

function ImageSlider() {
  const slideImages = [
    [
      {
        url: "https://khanhhoatravel.vn/wp-content/uploads/2018/05/hotel-icon.png",
        caption: "Thêm mới khách sạn",
        type: "hotel",
      },
      {
        url: "https://st4.depositphotos.com/34463872/38480/v/450/depositphotos_384806446-stock-illustration-airplane-symbol-flying-airplane-icon.jpg",
        caption: "Thêm chuyến bay mới",
        type: "flight",
      },
    ],
  ];
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-4 ">
      <Slide
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        duration={5000}
        transitionDuration={1000}
        arrows={true}
        indicators={true}
        infinite={true}
        pauseOnHover={true}
      >
        {slideImages.map((slide, slideIndex) => (
          <div key={slideIndex} className="each-slide grid grid-cols-2">
            {slide.map((item, index) => (
              <div key={index} className="slide-images mx-auto px-2 pl-6 w-3/4">
                <div className=" flex justify-center w-full">
                  <div
                    className=" rounded-lg  mt-6 overflow-hidden shadow-2xl hover:cursor-pointer "
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate(`/tera/${item.type}/register`);
                    }}
                  >
                    <img
                      className="h-48 w-full object-cover object-end bg-slate-300"
                      src={
                        item.url ||
                        "https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg"
                      }
                      alt="Home in Countryside"
                    />
                    <div className="p-6 bg-white">
                      <h4
                        className="mt-2 font-semibold text-lg leading-tight truncate text-nowrap text-center"
                        style={{ color: "rgb(1, 148, 243)" }}
                      >
                        {item.caption}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlider;
