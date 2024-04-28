import React from "react";

function ReviewHeader({ review }) {
  return (
    <div
      className="w-2/3"
      style={{
        width: "200px",
      }}
    >
      <div className="cursor-pointer">
        <p
          className="mt-10 mx-10 font-semibold"
          style={{
            fontFamily: "Arial",
          }}
        >
          {review.roomContract.customer.name ? review.roomContract.customer.name : review.roomContract.customer.user.username ? review.roomContract.customer.user.username : review.roomContract.customer.user.email}
        </p>
      </div>
    </div>
  );
}

export default ReviewHeader;
