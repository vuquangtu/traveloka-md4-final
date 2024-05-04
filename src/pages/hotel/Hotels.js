import HotelCard from "../../components/layout/hotels/HotelCard";
import HotelFilterSideBar from "../../components/layout/hotels/HotelFilterSideBar";
import HotelSearchBar from "../../components/layout/hotels/HotelSearchBar";
import HotelSortBar from "../../components/layout/hotels/HotelSortBar";

import Header from "../../components/hompage/Header";
import { useFetchhotelsQuery } from "../../redux/features/hotelsApi";



function Hotels(params) {
  const { data: hotels, isFetching } = useFetchhotelsQuery();
  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  console.log(hotels);

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
              {hotels?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <button>Xem thêm</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Hotels;
