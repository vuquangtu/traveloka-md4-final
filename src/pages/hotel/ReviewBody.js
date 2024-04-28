import React from "react";
import TravelokaIcon from "../../components/icon/TravelokaIcon";

function ReviewBody({ review }) {
  return (
    <div
      className="w-11/12 mt-7 me-36 font-semibold flex flex-col"
      style={{ color: "rgb(104, 113, 118)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="mt-1 gap-1 mb-5 h-8 me-96 pr-1 items-center justify-center w-24 rounded-full text-white text-base font-medium bg-sky-300 flex"
          style={{
            backgroundColor: "rgba(236,248,255,1.00)",
            color: "rgba(104,113,118,1.00)",
          }}
        >
          <TravelokaIcon />
          <p
            className="font-sans"
            style={{
              color: "rgba(1,148,243,1.00)",
            }}
          >
            {review.ratingPoint}
          </p>
          <p className="font-sans">/ 10</p>
        </div>
        <div
          className="whitespace-nowrap me-7 mb-2 font-medium text-lg"
          style={{ color: "rgba(104,113,118,1.00)" }}
        >
          <p className="ms-5">
            {new Date(review.commentTime).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex gap-2 mr-6">{review.comment}</div>

        <div className="flex gap-2 mt-3">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0b240a72290eea420aab0ba453b90e74.svg"
            height="12"
            alt="Translated by Google Icon"
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewBody;
