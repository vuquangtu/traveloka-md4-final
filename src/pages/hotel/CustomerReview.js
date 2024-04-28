import React, { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import ReviewImage from "./ReviewImage";
import ReviewHeader from "./ReviewHeader";
import ReviewBody from "./ReviewBody";

function CustomerReview({ review }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/review/images/${review.id}`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="right-content mx-auto pl-5 ">
      <div className="mt-5 -ml-14 mb-5 flex h-64 rounded-lg border-solid border-2 border-gray-200">
        <ReviewHeader review={review} />
        <div className="justify-between">
          <ReviewBody review={review} />
          <ReviewImage images={images} />
        </div>
      </div>
    </div>
  );
}

export default CustomerReview;
