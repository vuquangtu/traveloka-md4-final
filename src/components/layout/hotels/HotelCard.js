import { useEffect, useState } from "react";
import CoinIcon from "../../icon/CoinIcon";
import HotelIcon1 from "../../icon/HotelIcon1";
import HotelStarSmall from "../../icon/HotelStarSmall";
import LocationIconBlack from "../../icon/LocationIconBlack";
import TravelokaIcon from "../../icon/TravelokaIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeHotelId,
  changePageNumber,
} from "../../../redux/features/hotelSlice";

function HotelCard(params) {
  const combo = params.combo;
  const hotel = params.hotel;
  const hotelStar = params.hotel.hotelStar;
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let arr = [];
    for (let index = 0; index < hotelStar; index++) {
      arr.push(index);
    }
    setStars(arr);
  }, []);
  const originPrice = hotel.minOriginPrice;
  const sellPrice = hotel.minSellPrice;
  function handleChooseHotel() {
    dispatch(changePageNumber(0));
    if (combo) {
      dispatch(changeHotelId(hotel.id));
      navigate(`/combo/hotels/${hotel.id}`);
    } else {
      dispatch(changeHotelId(hotel.id));
      navigate(`/hotels/${hotel.id}`);
    }
  }

  return (
    <div onClick={handleChooseHotel} className="hotelCard">
      <div className="hotelImg">
        <img src={hotel.defaultImg} alt="hotelIcon" />
      </div>
      <div className="hotelInfo">
        <div className="row1">
          <div className="hotelName">
            <p>{hotel.hotelName}</p>
          </div>
          <div className="hotelRate">
            <span className="traveloka-logo">
              <TravelokaIcon />
            </span>
            <span className="points">{hotel.averagePoint}</span>
            <span className="numbers">
              (
              {hotel.hotelBookedNumbers

                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              )
            </span>
          </div>
        </div>
        <div className="row2">
          <HotelIcon1 /> <span>Khách sạn</span>{" "}
          {stars.map((value) => (
            <span key={value}>
              <HotelStarSmall />
            </span>
          ))}
        </div>
        <div className="row3">
          <LocationIconBlack /> <p>{hotel.address}</p>
        </div>
        <div className="row4">
          <CoinIcon /> <span>xu Priority</span>
        </div>
      </div>
      <div className="hotelPrice">
        <div className="row12">
          <div className="row1">
            <span>{`${originPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
          </div>
          <div className="row2">
            <span>{`${sellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
          </div>
        </div>
        <div className="row3">
          <button>Chọn phòng</button>
        </div>
      </div>
    </div>
  );
}
export default HotelCard;
