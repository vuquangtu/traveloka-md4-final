import React, { useEffect } from "react";
import HoverRating from "../icon/HoverRating";
import axios from "../../config/privateAxios";

function HotelCard({ hotel }) {
  const [reviewQuantity, setReviewQuantity] = React.useState(0);
  useEffect(() => {
    axios
      .get(`/api/reviews/hotel/count/${hotel.id}`)
      .then((res) => {
        setReviewQuantity(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [reviewQuantity, hotel.id]);
  return (
    <div className="flex gap-6">
      <div
        className="bg-white rounded-lg  mt-6 overflow-hidden shadow-2xl md:w-2/3 xl:w-1/5 lg:w-2/3 sm:w-1/2 "
        style={{ width: "90%" }}
      >
        <img
          className="h-48 w-full object-cover object-end"
          src={
            hotel.defaultImg ||
            "https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2023/08/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg"
          }
          alt="Home in Countryside"
        />
        <div className="p-6">
          <div className="flex items-baseline"></div>
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
            {hotel.hotelName}
          </h4>

          <div className="mt-1">
            <span>{hotel.city.name}</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-teal-600 font-semibold">
              <span>
                <HoverRating initial={hotel.hotelStar} />
              </span>

              <span className="ml-2 text-gray-600 text-sm">
                {reviewQuantity} reviews
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
