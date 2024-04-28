import { useState } from "react";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const image = [
    "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583410740412-16a042abff83626e0d5823b30c24403f.png?tr=q-75",
    "https://ik.imagekit.io/tvlk/image/imageResource/2020/03/05/1583415239625-255deb42308af0bc7cdfaba1905e1618.svg?tr=q-75",
  ];

  const totalSlides = image.length;

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out">
        {image.map((imageUrl, index) => (
          <div
            key={index}
            className={`w-full flex-none ${
              index === currentSlide ? "" : "hidden"
            }`}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <img src={imageUrl} alt="" className="max-w-64" />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-4 py-2 rounded-l-md"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-4 py-2 rounded-r-md"
      >
        Next
      </button>
      
    </div>
  );
}

export default Slider;
