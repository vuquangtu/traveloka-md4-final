import React from "react";
import ImageSlider from "./ImageSilder";

function TeraBanner() {
  return (
    <div>
      <div
        className="w-full py-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(54, 127, 211), rgb(35, 93, 159))",
        }}
      >
        <div className="w-4/5 mx-auto">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
}

export default TeraBanner;
