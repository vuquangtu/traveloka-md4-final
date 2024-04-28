import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function ImageSlider() {
  const slideImages = [
    [
      {
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 1",
      },
      {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: "Slide 2",
      },
      {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 3",
      },
    ][
      ({
        url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 1",
      },
      {
        url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        caption: "Slide 2",
      },
      {
        url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        caption: "Slide 3",
      })
    ],
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-4">
      <Slide>
        {slideImages.map((slideImage, index) =>
          slideImage.map((image, imageIndex) => (
            <div key={index} className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${image.url})`,
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundSize: "cover",
                }}
              >
                <span
                  style={{
                    padding: "20px",
                    background: "#efefef",
                    color: "#000000",
                  }}
                >
                  {image.caption}
                </span>
              </div>
            </div>
          ))
        )}
      </Slide>
    </div>
  );
}

export default ImageSlider;
