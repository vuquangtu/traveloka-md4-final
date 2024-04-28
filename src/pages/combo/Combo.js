import Header from "../../components/hompage/Header";
import ComboFlightSearchBar from "../../components/layout/combo/ComboFlightSearchBar";
import ComboHotelSearchBar from "../../components/layout/combo/ComboHotelSearchBar";
import HotelSortBar from "../../components/layout/hotels/HotelSortBar";
import HotelCard from "../../components/layout/hotels/HotelCard";
import HotelFilterSideBar from "../../components/layout/hotels/HotelFilterSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import { selectHotel, changePageNumber } from "../../redux/features/hotelSlice";
import {
  selectHotels,
  changeHotels,
  addHotels,
} from "../../redux/features/hotelsSlice";
import {
  selectComboFlight,
  changePage,
} from "../../redux/features/comboFlightSlice";
import {
  addCombos,
  changeCombos,
  selectCombos,
} from "../../redux/features/combosSlice";
import ComboFlightTicket from "../../components/layout/combo/ComboFlightTicket";

function Combo(params) {
  const hotel = useSelector(selectHotel);
  const comboFlight = useSelector(selectComboFlight);
  const hotelsStates = useSelector(selectHotels);
  const hotels = hotelsStates.hotels;
  const combos = useSelector(selectCombos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changePageNumber(0));

    if (comboFlight.id == null) {
      axios
        .post("/api/combo/search", {
          searchFlightDetailsRequestDTO: comboFlight,
          hotelSearchDTO: hotel,
          page: 0,
        })
        .then((result) => {

          if (result.data.length !== 0) {
            dispatch(changeCombos(result.data.unitComboResponDTOs));
          } else {
            dispatch(changeCombos([]));
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("/api/combo/flight", {
          seatId: comboFlight.id,
          hotelSearchDTO: hotel,
          page: 0,
        })
        .then((result) => {

          if (result.data.length !== 0) {
            dispatch(changeCombos(result.data.unitComboResponDTOs));
          } else {
            dispatch(changeCombos([]));
          }
        })
        .catch((error) => console.log(error));
    }
  }, []);

  function handleLoadMore() {
    axios
      .post("/api/combo/flight", {
        seatId: comboFlight.id,
        hotelSearchDTO: hotel,
        page: +comboFlight.page + 1,
      })
      .then((result) => dispatch(addCombos(result.data.unitComboResponDTOs)))
      .catch();
    dispatch(changePage(+comboFlight.page + 1));
  }
  return (
    <div className="combo">
      <div className="hotelHeader">
        <Header />
      </div>
      <div className="hotels">
        <ComboHotelSearchBar />
        <ComboFlightSearchBar />
        <div className="combo-container">
          <HotelFilterSideBar combo={true} />
          <div className="hotels-body">
            <HotelSortBar combo={true} />
            {combos.length !== 0 ? (
              <ComboFlightTicket seat={combos[0].seat} />
            ) : null}

            <div className="hotels-list">
              {combos
                ? combos.map((combo) => (
                    <HotelCard
                      combo={true}
                      key={combo.hotel.id}
                      hotel={combo.hotel}
                    />
                  ))
                : null}
            </div>
            <button onClick={handleLoadMore}>Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Combo;
