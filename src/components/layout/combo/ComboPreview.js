import PersonSmallIcon from "../../icon/PersonSmallIcon";
import TravelokaIcon from "../../icon/TravelokaIcon";
import YellowStar from "../../icon/YellowStar";
import BillIcon from "../../icon/BillIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHotel } from "../../../redux/features/hotelSlice";
import axios from "../../../config/privateAxios";
import { toast } from "react-toastify";
import { selectComboFlight } from "../../../redux/features/comboFlightSlice";
import ComboFlightTicket from "./ComboFlightTicket";
import PreviewComboFlightTicket from "./PreviewComboFlightTicket";
import GifIcon from "../../icon/GifIcon";
import BackButton from "../../buttons/BackButton";
import PaymentNote from "../../utils/PaymentNote";

function ComboPreview(params) {
  const { id } = useParams();
  const comboFlight = useSelector(selectComboFlight);
  const [combo, setCombo] = useState();
  const { roomId, flightId } = useParams();
  const [room, setRoom] = useState({});
  const [hotel, setHotel] = useState(useSelector(selectHotel));
  const [stars, setStars] = useState([]);
  const [image, setImage] = useState("");
  const [roomContract, setRoomContract] = useState();

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    if (id == null) {
      axios
        .get(`/api/rooms/${roomId}`)
        .then((result) => {
          setRoom(result.data);
          let arr = [];
          for (let index = 0; index < result.data.hotel.hotelStar; index++) {
            arr.push(index);
          }
          setStars(arr);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  useEffect(() => {
    if (id == null) {
      axios
        .get(`/api/room/images`, { params: { roomId: roomId } })
        .then((result) => setImage(result.data[0].url));
    }
  }, []);
  useEffect(() => {
    if (id == null) {
      let date = hotel.startDate;
      let dateList = date.split("-");

      let temporature = new Date(dateList[0], dateList[1] - 1, dateList[2]);

      setDate(temporature);
      let temporature2 = new Date();
      temporature2.setDate(temporature.getDate() + hotel.nights);
      setEndDate(temporature2);
    }
  }, []);

  useEffect(() => {
    if (id == null) {
      let date = hotel.startDate;
      let dateList = date.split("-");
      let startDate = new Date(dateList[0], dateList[1] - 1, dateList[2]);
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + hotel.nights);

      axios
        .post("/api/combo/preview", {
          seatId: flightId,
          seatQuantity: comboFlight.seatQuantity,
          roomId: roomId,
          roomQuantity: hotel.roomQuantity,
          startDate: startDate,
          endDate: endDate,
        })
        .then((result) => {
          setCombo(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (id != null) {
      axios.get(`/api/combo/${id}`)
        .then(result => {
          setRoomContract(result.data.roomContract);
          console.log(result)
          setRoom(result.data.roomContract.room);
          let arr = [];
          for (let index = 0; index < result.data.roomContract.room.hotel.hotelStar; index++) {
            arr.push(index);
          }
          setStars(arr);
          setImage(result.data.roomContract.room.hotel.defaultImg);
          let arrStartDate = result.data.roomContract.startDate.split("-");
          let arrEndDate = result.data.roomContract.endDate.split("-");
          console.log();
          setDate(new Date(arrStartDate[0], arrStartDate[1] - 1, arrStartDate[2]));
          setEndDate(new Date(arrEndDate[0], arrEndDate[1] - 1, arrEndDate[2]));
          setCombo(result.data);
        })
        .catch(error => console.log(error))
    }
  }, [])

  function handleSubmit(params) {
    if (id == null) {
      let date = hotel.startDate;
      let dateList = date.split("-");
      let startDate = new Date(dateList[0], dateList[1] - 1, dateList[2]);
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + hotel.nights);
      axios
        .post("/api/combo", {
          seatId: flightId,
          seatQuantity: comboFlight.seatQuantity,
          roomId: roomId,
          roomQuantity: hotel.roomQuantity,
          startDate: startDate,
          endDate: endDate,
        })
        .then((result) => {
          axios
            .post(`/api/combo/vnpay/${result.data.id}`)
            .then((result) => {
              window.location.replace(result.data.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`/api/combo/vnpay/${combo.id}`)
        .then((result) => {
          window.location.replace(result.data.data);
        })
        .catch((error) => console.log(error));
    }
  }


return (
  <div className="roomContractPreview">
    <BackButton />
    <PaymentNote />
    <div className="roomContractPreview-container">
      <div className="roomContractPreview-container-header"></div>
      <div className="roomContractPreview-container-group1">
        <div className="roomContractPreview-container-group1-left">
          <span className="roomContractPreview-container-group1-left-name">
            {room.hotel ? room.hotel.hotelName : null}
          </span>
          <span>
            <TravelokaIcon />
          </span>
          <span className="roomContractPreview-container-group1-left-point">
            {room.hotel ? room.hotel.averagePoint : null}
          </span>
          <span className="roomContractPreview-container-group1-left-booked">
            ({room.hotel ? room.hotel.hotelBookedNumbers : null})
          </span>
        </div>
        <div className="roomContractPreview-container-group1-right">
          {stars.map((value, index) => (
            <span key={index}>
              <YellowStar />
            </span>
          ))}
        </div>
      </div>
      <div className="roomContractPreview-container-group2">
        <img src={image} alt="room" />
      </div>
      <div className="roomContractPreview-container-group3">
        <div className="roomContractPreview-container-group3-container">
          <div className="roomContractPreview-container-group3-container-left">
            <div className="roomContractPreview-container-group3-container-left-title">
              Nhận phòng
            </div>
            <div className="roomContractPreview-container-group3-container-left-content">
              {date.toLocaleDateString("vi-VN", options)}
            </div>
          </div>
          <div className="roomContractPreview-container-group3-container-center">
            <div className="roomContractPreview-container-group3-container-center-nights">
              {`${id ? Math.abs(date - endDate) / 1000 / 60 / 60 / 24 : hotel.nights} đêm`}
            </div>
            <div className="roomContractPreview-container-group3-container-center-line"></div>
          </div>
          <div className="roomContractPreview-container-group3-container-right">
            <div className="roomContractPreview-container-group3-container-right-title">
              Trả phòng
            </div>
            <div className="roomContractPreview-container-group3-container-right-content">
              {endDate.toLocaleDateString("vi-VN", options)}
            </div>
          </div>
        </div>
      </div>
      <div className="roomContractPreview-container-group4">
        <div className="roomContractPreview-container-group4-roomName">
          ({hotel.roomQuantity}x) {room.roomType ? room.roomType.name : null}
        </div>
        <div className="roomContractPreview-container-group4-person">
          <span>
            <PersonSmallIcon />
          </span>{" "}
          <span>{hotel.personQuantity} khách</span>
        </div>
      </div>
      <div className="roomContractPreview-container-group5">
        <div className="roomContractPreview-container-group5-left">
          <div className="roomContractPreview-container-group5-left-row1">
            <span>
              <BillIcon />
            </span>{" "}
            <span className="roomContractPreview-container-group5-left-row1-text">
              Tổng giá phòng
            </span>
          </div>
          <div className="roomContractPreview-container-group5-left-row2">
            <span className="roomContractPreview-container-group5-left-row2-text">
              {id ? roomContract ? roomContract.roomQuantity : null : hotel.roomQuantity} phòng, {hotel.nights} đêm
            </span>
          </div>
        </div>
        <div className="roomContractPreview-container-group5-right">
          <div className="roomContractPreview-container-group5-right-row1">
            <span className="roomContractPreview-container-group5-right-row1-originPrice">
              {id ? null : `${(
                room.unitPriceOrigin *
                hotel.roomQuantity *
                hotel.nights
              )
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
          </div>
          <div className="roomContractPreview-container-group5-right-row2">
            <span className="roomContractPreview-container-group5-right-row2-sellPrice">{`${(
              id ?
                roomContract ?
                  roomContract.totalMoney
                  : ""
                : room.unitPriceSell *
                hotel.roomQuantity *
                hotel.nights
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
          </div>
        </div>
      </div>
      {/* <div className="roomContractPreview-container-group6">
                    <button onClick={handleSubmit} className="roomContractPreview-container-group6-button">Tiếp tục thanh toán</button>
                </div> */}
    </div>
    {combo ? <PreviewComboFlightTicket seat={combo.ticketAirPlant} /> : null}

    <div className="comboPreview-summary">
      <div className="comboPreview-summary-header">Chi tiết giá</div>
      <div className="comboPreview-summary-room">
        <span className="comboPreview-summary-room-text">Giá phòng</span>
        <span className="comboPreview-summary-room-money">{`${(
          id ?
            roomContract ?
              roomContract.totalMoney
              : ""
            : room.unitPriceSell *
            hotel.roomQuantity *
            hotel.nights
        )
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`}</span>
      </div>
      <div className="comboPreview-summary-flight">
        <span className="comboPreview-summary-room-text">Giá vé máy bay</span>
        <span className="comboPreview-summary-room-money">
          {combo
            ? `${combo.ticketAirPlant.totalMoney
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`
            : null}
        </span>
      </div>
      <div className="comboPreview-summary-total">
        <div className="comboPreview-summary-total-text">
          <div>Tổng giá tiền</div>
          <div className="comboPreview-summary-total-text-coupon">
            <GifIcon /> -10%
          </div>
        </div>
        <div className="comboPreview-summary-total-money">
          <div className="comboPreview-summary-total-money-origin">
            {combo
              ? `${(combo.totalMoney / 0.9)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`
              : null}
          </div>
          <div className="comboPreview-summary-total-money-sell">
            {combo
              ? `${combo.totalMoney
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND`
              : null}
          </div>
        </div>
      </div>
      <div onClick={handleSubmit} className="comboPreview-summary-confirm">
        Tiếp tục thanh toán
      </div>
    </div>
  </div>
);
}
export default ComboPreview;
