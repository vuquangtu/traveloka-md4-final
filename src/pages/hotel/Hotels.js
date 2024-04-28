import HotelCard from "../../components/layout/hotels/HotelCard";
import HotelFilterSideBar from "../../components/layout/hotels/HotelFilterSideBar";
import HotelSearchBar from "../../components/layout/hotels/HotelSearchBar";
import HotelSortBar from "../../components/layout/hotels/HotelSortBar";
import axios from "../../config/privateAxios";
import { useEffect } from "react";
import {
  changeHotels,
  selectHotels,
  addHotels,
} from "../../redux/features/hotelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { changePageNumber, selectHotel } from "../../redux/features/hotelSlice";
import Header from "../../components/hompage/Header";

function Hotels(params) {
  const hotel = useSelector(selectHotel);
  const hotelsStates = useSelector(selectHotels);
  const hotels = hotelsStates.hotels;
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .post("/api/search/hotels", { ...hotel })
      .then((result) => dispatch(changeHotels(result.data.hotels)))
      .catch();
    return () => {
      dispatch(changePageNumber(0))
    }
  }, []);

  function handleLoadMore() {
    axios
      .post("/api/search/hotels", {
        ...hotel,
        pageNumber: hotel.pageNumber + 1,
      })
      .then((result) => dispatch(addHotels(result.data.hotels)))
      .catch();
    dispatch(changePageNumber(hotel.pageNumber + 1));
  }

  return (
    <>
      <div className="hotelHeader">
        <Header />
      </div>
      <div className="hotels">
        <HotelSearchBar />
        <div className="hotels-container">
          <HotelFilterSideBar />
          <div className="hotels-body">
            <HotelSortBar />
            <div className="hotels-list">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <button onClick={handleLoadMore}>Xem thêm</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hotels;
